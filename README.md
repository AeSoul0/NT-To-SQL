Ecco un README dettagliato per il tuo progetto:

# Progetto Finale: Natural Language to SQL Translator

Questo progetto è un'applicazione web full-stack che traduce le domande in linguaggio naturale in query SQL, consentendo agli utenti di interrogare un database cinematografico in modo intuitivo. L'applicazione è costruita con un'architettura a microservizi, containerizzata con Docker.

## Funzionalità

  * **Traduzione da Linguaggio Naturale a SQL**: Inserisci una domanda in italiano (es. "Mostrami i film di Christopher Nolan") e l'applicazione la convertirà in una query SQL eseguibile.
  * **Esecuzione Diretta di SQL**: Esegui direttamente query `SELECT` sul database per test o analisi avanzate.
  * **Visualizzazione dello Schema**: Ispeziona lo schema del database per vedere le tabelle e le colonne disponibili.
  * **Aggiunta di Dati**: Inserisci nuovi dati nel database attraverso un semplice form.
  * **Interfaccia Web Intuitiva**: Un frontend moderno e reattivo per interagire con tutte le funzionalità.

## Architettura

Il progetto utilizza un'architettura a microservizi, dove ogni componente è un servizio indipendente eseguito nel proprio container Docker:

  * **Frontend**: Un'applicazione web costruita con FastAPI che serve l'interfaccia utente HTML, CSS e JavaScript. Comunica con il servizio di backend tramite richieste HTTP.
  * **Backend**: Un'API FastAPI che gestisce la logica di business. Riceve le richieste dal frontend, interagisce con il database e con il servizio Ollama per la traduzione in SQL.
  * **Database**: Un'istanza di MariaDB che memorizza i dati cinematografici.
  * **Ollama**: Un servizio che esegue un modello di linguaggio di grandi dimensioni (LLM) per tradurre il linguaggio naturale in SQL.
  * **Tester**: Un servizio dedicato per eseguire i test automatici sul backend.

## Stack Tecnologico

  * **Backend**: Python, FastAPI, MariaDB Connector, Pydantic, Poetry
  * **Frontend**: Python, FastAPI, Jinja2, HTML5, CSS3
  * **Traduzione NLU**: Ollama con il modello `gemma3:1b-it-qat`
  * **Database**: MariaDB
  * **Containerizzazione**: Docker, Docker Compose

## Prerequisiti

  * [Docker](https://docs.docker.com/get-docker/)
  * [Docker Compose](https://docs.docker.com/compose/install/)

## Guida all'Installazione

1.  **Clona il Repository**

    ```bash
    git clone https://github.com/tuo-utente/progetto-finale.git
    cd progetto-finale
    ```

2.  **Avvia i Servizi con Docker Compose**

    Esegui il seguente comando dalla directory principale del progetto:

    ```bash
    docker-compose up --build
    ```

    Questo comando costruirà le immagini Docker per ogni servizio (se non esistono già) e avvierà tutti i container. Potrebbe essere necessario un po' di tempo al primo avvio, poiché Ollama scaricherà il modello LLM.

3.  **Accedi all'Applicazione**

    Apri il tuo browser web e vai a `http://localhost:8080`.

## Utilizzo

L'interfaccia web è suddivisa in diverse sezioni:

  * **Cerca con Linguaggio Naturale**: Inserisci la tua domanda in italiano e clicca su "Traduci ed Esegui". I risultati verranno visualizzati in una tabella.
  * **Esegui Query SQL**: Scrivi la tua query `SELECT` nel campo di testo e clicca su "Esegui SQL".
  * **Schema del Database**: Clicca su "Mostra Schema" per vedere le tabelle e le colonne del database.
  * **Aggiungi Dati**: Inserisci i dati di un nuovo film nel formato specificato e clicca su "Aggiungi al Database".

## Struttura del Progetto

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

  * `backend/`: Contiene il codice sorgente del servizio di backend FastAPI.
  * `frontend/`: Contiene il codice sorgente del servizio di frontend.
  * `mariadb/mariadb_init/`: Contiene lo script SQL per l'inizializzazione del database.
  * `ollama/`: Contiene il Dockerfile per creare l'immagine personalizzata di Ollama.
  * `docker-compose.yaml`: Definisce e orchestra tutti i servizi dell'applicazione.

## Endpoint dell'API Backend

Il servizio di backend, in esecuzione su `http://localhost:8003` (all'interno della rete Docker), espone i seguenti endpoint principali:

  * `GET /schema_summary`: Restituisce lo schema del database.
  * `POST /add`: Aggiunge nuovi dati al database.
  * `POST /sql_search`: Esegue una query SQL diretta.
  * `POST /search`: Traduce una domanda in linguaggio naturale in SQL e la esegue.

## Test

Per eseguire i test automatici per il servizio di backend, puoi usare il servizio `tester` definito in `docker-compose.yaml`:

```bash
docker-compose up tester
```

Questo comando avvierà un container che eseguirà i test con `pytest`.
