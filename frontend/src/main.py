# frontend/src/main.py

import os
import requests
import json
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from typing import Optional

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="Frontend Service")

app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))
BACKEND_URL = os.environ.get("BACKEND_URL", "http://localhost:8003")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request, 
        "results": None, 
        "sql": None,
        "sql_validation": None,
        "schema": None,
        "error": None
    })

@app.post("/", response_class=HTMLResponse)
async def handle_form_submission(
    request: Request,
    action: str = Form(...),
    sql_query: Optional[str] = Form(None),
    question: Optional[str] = Form(None),
    data_json: Optional[str] = Form(None),
    data_line: Optional[str] = Form(None)
):
    context = {
        "request": request,
        "results": None,
        "sql": None,
        "sql_validation": None,
        "schema": None,
        "error": None
    }
    
    try:
        context["action"] = action

        if action == "schema_summary":
            response = requests.get(f"{BACKEND_URL}/schema_summary")
            response.raise_for_status()
            context["schema"] = response.json()
            
        elif action == "sql_search":
            response = requests.post(f"{BACKEND_URL}/sql_search", json={"sql_query": sql_query})
            response.raise_for_status()
            data = response.json()
            context["sql"] = data.get("sql")
            context["sql_validation"] = data.get("sql_validation")
            context["results"] = data.get("results")
            
        elif action == "search":
            response = requests.post(f"{BACKEND_URL}/search", json={"question": question})
            response.raise_for_status()
            data = response.json()
            context["sql"] = data.get("sql")
            context["sql_validation"] = data.get("sql_validation")
            context["results"] = data.get("results")
            context["question"] = data.get("question")
            
        elif action == "add":
            payload = {}
            if data_json:
                payload = json.loads(data_json)
            elif data_line:
                payload = {"data_line": data_line}
                
            response = requests.post(f"{BACKEND_URL}/add", json=payload)
            response.raise_for_status()
            context["message"] = "Data successfully inserted!"
            
        else:
            context["error"] = "Azione non valida."

    except requests.RequestException as e:
        context["error"] = f"Errore di comunicazione con il backend: {e}"
        if e.response is not None:
            try:
                context["error_detail"] = e.response.json()
            except json.JSONDecodeError:
                context["error_detail"] = e.response.text

    return templates.TemplateResponse("index.html", context)


@app.post("/add_movie_async")
async def handle_add_movie_async(request: Request):
    try:
        movie_data = await request.json()
        response = requests.post(f"{BACKEND_URL}/add", json=movie_data)
        response.raise_for_status()
        return JSONResponse(content=response.json(), status_code=response.status_code)
    except requests.RequestException as e:
        status_code = e.response.status_code if e.response is not None else 500
        detail = e.response.json().get("detail") if (e.response is not None and e.response.text) else str(e)
        return JSONResponse(content={"detail": detail}, status_code=status_code)