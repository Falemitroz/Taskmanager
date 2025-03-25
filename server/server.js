const express = require('express');
const cors = require('cors');
const db = require('./models'); // Importa tutti i modelli e la connessione al database

const app = express();

// ✅ LOG: Traccia ogni richiesta per debugging
app.use((req, res, next) => {
  console.log(`🔥 Richiesta ricevuta: ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
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

// ✅ Middleware per parsing JSON
app.use(express.json());

// ✅ Gestione esplicita delle richieste OPTIONS
app.options("*", cors(corsOptions));

// ✅ Import delle route
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/auth", authRoutes);
app.use("/api/task", taskRoutes);

// Test della connessione al database
db.sequelize.authenticate()
    .then(() => console.log('Database connection has been established successfully.'))
    .catch((err) => console.error('Unable to connect to the database:', err));

// Sincronizzazione del database e dei modelli
db.sequelize.sync({ force: false }) 
    .then(() => console.log("Database & tables updated!"))
    .catch((err) => console.error("Error syncing database:", err));

// Avvio del server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));