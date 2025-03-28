const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Usa una variabile d'ambiente per il segreto JWT (più sicuro)
const JWT_SECRET = "secret";

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Controlla se l'utente esiste già
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: "Utente già esistente." });
        }
        
        // Hash della password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Creazione del nuovo utente
        const newUser = await User.create({ username, password: hashedPassword });

        const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ id: newUser.id, username: newUser.username, token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Trova l'utente nel database
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: "Utente non trovato." });
        }

        // Confronta la password inserita con quella nel database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Password errata." });
        }

        // Genera il token JWT
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ id: user.id, username: user.username, token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        return res.status(200).json({ message: "Logout effettuato con successo" });
    } catch (error) {
        console.error("Errore durante il logout:", error);
    return res.status(500).json({ message: "Errore del server" });
    }
}