# TaskManager

TaskManager è un'applicazione per la gestione delle attività, sviluppata con **React** per il frontend, **Node.js** ed **Express** per il backend, e **Sequelize** per la gestione del database.

## 🚀 Guida all'installazione e all'avvio

Se hai appena clonato questa repository o vuoi eseguire il progetto sul tuo computer, segui questi passaggi.

### 1. Clonare il repository

Per prima cosa, clona il repository sul tuo computer utilizzando il comando:

```bash
git clone https://github.com/Falemitroz/TaskManager.git
cd TaskManager
```

### 2. Installare le dipendenze

Il progetto è composto dal frontend e dal backend, ognuno con le proprie dipendenze.

🖥 Frontend (Client)
1. Per installare le dipendenze (dove si trova il frontend in React) vai nella 
cartella client con questo comando:

```bash
cd client
```

2. Una volta dentro la cartella client, installa tutte le dipendenze necessarie con il comando:

```bash
npm install
```

3. Dopo aver installato le dipendenze, avvia il client con:

```bash
npm start
```

Il server di sviluppo del client React si avvierà e potrai accedere all'applicazione tramite il browser all'indirizzo:

http://localhost:3000

⚙️ Backend (Server)

1. Ora, torna alla cartella principale del progetto ed entra nella cartella server dove si trova il backend in Node.js e Express:

```bash
cd ../server
```

2. Esegui i passaggi 2 e 3 come hai fatto per il client

Il server Express inizierà a girare e potrai accedere al backend all'indirizzo:

http://localhost:5000

### 3. Configurare il Database

Questo progetto utilizza PostgreSQL come database e Sequelize come ORM (Object-Relational Mapping) per la gestione delle query.

1. Per prima cosa, assicurati di avere PostgreSQL installato e in esecuzione sul tuo computer. Se non ce l'hai, puoi scaricarlo da https://www.postgresql.org/download/

2. Crea un database vuoto nel tuo PostgreSQL per l'applicazione. Puoi farlo con il comando:

```bash
createdb taskmanager
```

3. Una volta creato il database, apri il file di configurazione di Sequelize. Si trova nella cartella server/config/database.js. Qui dovrai inserire le credenziali del tuo database. Ecco un esempio di come dovrebbe essere configurato:

```json
{
  "development": {
    "username": "your_db_user",
    "password": "your_db_password",
    "database": "taskmanager",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

Assicurati di sostituire your_db_user e your_db_password con le tue credenziali per PostgreSQL.

4. Ora, per creare tutte le tabelle nel database, dovrai eseguire le migrazioni. Esegui il seguente comando:

```bash
npx sequelize-cli db:migrate
```

### 4. Avviare l'Applicazione

Ora che hai configurato correttamente il progetto, puoi avviare sia il frontend che il backend.

🖥 Per avviare il client, spostati nella cartella client ed esegui:

```bash
npm start
```

⚙️ Per avviare il frontend, spostati nella cartella server ed esegui lo stesso comando.

### 5. Verifiche finali

 A questo punto, se hai seguito correttamente i passaggi precedenti, dovresti essere in grado di interagire con l'applicazione. Il frontend comunica con il backend tramite le API esposte, e il database PostgreSQL gestisce i dati delle attività.

 #### 📦 Dipendenze ####
1. Frontend (Client)
    React: per la creazione dell'interfaccia utente.
    React Router: per la gestione della navigazione.
    Axios: per le richieste HTTP al server.

2. Backend (Server)
    Express: per la gestione delle route e del server.
    Sequelize: per l'interazione con il database.
    jsonwebtoken: per la gestione dei token di autenticazione.
    bcrypt: per la crittografia delle password.
    pg e pg-hstore: per l'interazione con PostgreSQL.

#### ⚠️ Note Importanti ####
1. Assicurati di avere Node.js e npm installati sul tuo computer. Puoi verificare la tua versione di Node.js con il comando:

```bash
node -v
```

Se non li hai, scarica e installa Node.js da https://nodejs.org/en

2. Verifica che PostgreSQL sia correttamente installato e in esecuzione. Puoi scaricarlo da https://www.postgresql.org/download/

3. Se hai problemi con la configurazione del database, assicurati che le credenziali nel file config/database.js siano corrette e che il database taskmanager esista nel tuo ambiente PostgreSQL.
