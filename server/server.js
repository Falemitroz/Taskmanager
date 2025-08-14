require('dotenv').config(); // 👈 deve essere in cima o comunque prima di usare process.env

const express = require('express');
const cors = require('cors');
const db = require('./models'); // Importa tutti i modelli e la connessione al database
const path = require('path');

const app = express();

app.use(express.json()); 

// ✅ LOG: Traccia ogni richiesta per debugging
app.use((req, res, next) => {
  console.log(`🔥 Richiesta ricevuta: ${req.method} ${req.url}`);
  console.log("Body:", req.body);
  next();
});

// ✅ Configurazione CORS
const corsOptions = {
    origin: "http://localhost:3000", // Permette richieste solo dal client
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Permette di inviare cookie e token
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));


// ✅ Gestione esplicita delle richieste OPTIONS
app.options("*", cors(corsOptions));

// ✅ Import delle routes
const taskRoutes = require("./routes/taskRoutes");
const taskListRoutes = require("./routes/taskListRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/taskLists", taskListRoutes);

// ✅ Serve la build React come frontend statico
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Test della connessione al database
db.sequelize.authenticate()
    .then(() => console.log('Database connection has been established successfully.'))
    .catch((err) => console.error('Unable to connect to the database:', err));

// Sincronizzazione del database e dei modelli
db.sequelize.sync({ force: true }) 
    .then(() => console.log("Database & tables updated!"))
    .catch((err) => console.error("Error syncing database:", err));

    
// ✅ Serve la build React come frontend statico
app.use(express.static(path.join(__dirname, '../client/build')));

// ✅ Fallback: qualsiasi rotta non gestita dalle API restituisce index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Avvio del server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));