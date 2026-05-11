# Natural Language to SQL Translator

This project is a full-stack web application that translates natural language questions into SQL queries, allowing users to query a movie database intuitively. The application is built with a microservices architecture, containerized with Docker.

## Features

* **Natural Language to SQL Translation**: Enter a question in English (e.g., "Show me Christopher Nolan's films") and the application will convert it into an executable SQL query.
* **Direct SQL Execution**: Run `SELECT` queries directly on the database for testing or advanced analysis.
* **Schema Visualization**: Inspect the database schema to view available tables and columns.
* **Data Entry**: Insert new data into the database through a simple form.
* **Intuitive Web Interface**: A modern, responsive frontend to interact with all features.

## Architecture

The project uses a microservices architecture, where each component is an independent service running in its own Docker container:

* **Frontend**: A web application built with FastAPI that serves the HTML, CSS, and JavaScript user interface. It communicates with the backend service via HTTP requests.
* **Backend**: A FastAPI API that handles the business logic. It receives requests from the frontend, interacts with the database, and communicates with the Ollama service for SQL translation.
* **Database**: A MariaDB instance that stores the movie data.
* **Ollama**: A service that runs a large language model (LLM) to translate natural language into SQL.
* **Tester**: A dedicated service for running automated tests on the backend.

## Tech Stack

* **Backend**: Python, FastAPI, MariaDB Connector, Pydantic, Poetry
* **Frontend**: Python, FastAPI, Jinja2, HTML5, CSS3
* **NLU Translation**: Ollama with the `gemma3:1b-it-qat` model
* **Database**: MariaDB
* **Containerization**: Docker, Docker Compose

## Prerequisites

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

## Installation Guide

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/final-project.git
   cd final-project
   ```

2. **Start the Services with Docker Compose**

   Run the following command from the project root directory:

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker images for each service (if they don't already exist) and start all containers. The first startup may take some time, as Ollama will need to download the LLM model.

3. **Access the Application**

   Open your web browser and navigate to `http://localhost:8080`.

## Usage

The web interface is divided into several sections:

* **Search with Natural Language**: Enter your question and click "Translate & Run". Results will be displayed in a table.
* **Run SQL Query**: Write your `SELECT` query in the text field and click "Run SQL".
* **Database Schema**: Click "Show Schema" to view the database tables and columns.
* **Add Data**: Enter the data for a new movie in the specified format and click "Add to Database".

## Project Structure

```
.
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── pyproject.toml
├── frontend/
│   ├── src/
│   ├── static/
│   ├── templates/
│   ├── Dockerfile
│   └── pyproject.toml
├── mariadb/
│   └── mariadb_init/
│       └── init.sql
├── ollama/
│   ├── scripts/
│   └── Dockerfile
└── docker-compose.yaml
```

* `backend/`: Contains the source code for the FastAPI backend service.
* `frontend/`: Contains the source code for the frontend service.
* `mariadb/mariadb_init/`: Contains the SQL script for database initialization.
* `ollama/`: Contains the Dockerfile for building the custom Ollama image.
* `docker-compose.yaml`: Defines and orchestrates all application services.

## Backend API Endpoints

The backend service, running on `http://localhost:8003` (within the Docker network), exposes the following main endpoints:

* `GET /schema_summary`: Returns the database schema.
* `POST /add`: Adds new data to the database.
* `POST /sql_search`: Executes a direct SQL query.
* `POST /search`: Translates a natural language question into SQL and executes it.

## Testing

To run the automated tests for the backend service, you can use the `tester` service defined in `docker-compose.yaml`:

```bash
docker-compose up tester
```

This command will start a container that runs the tests with `pytest`.
