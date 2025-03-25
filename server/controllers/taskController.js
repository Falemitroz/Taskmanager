const Task = require("../models/Task");

exports.create = async (req, res) => {
    console.log("Task Creato");
    try {
        const { title, description } = req.body;
        const userId = req.user.userId;  // 🔹 Ottieni userId dal token

        if (!userId) {
            return res.status(401).json({ error: "Non autorizzato" });
        }

        console.log("Title:", title);
        console.log("Description:", description);
        console.log("UserId:", userId);

        const newTask = await Task.create({ title, description, userId });
        res.status(201).json({ message: "Task created", newTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
    console.log("Richesta ricevuta!");
    try {
        const userId = req.user.userId;  // 🔹 Ottieni userId dal token

        if (!userId) {
            return res.status(401).json({ error: "Non autorizzato" });
        }

        const tasks = await Task.findAll({ where: { userId } });

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Errore nel recupero delle tasks:", error);
        res.status(500).json({ message: "Errore nel server" });
    }
};

exports.getByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const userId = req.user.userId;  // 🔹 Ottieni userId dal token

        if (!userId) {
            return res.status(401).json({ error: "Non autorizzato" });
        }

        if (!title) {
            return res.status(400).json({ error: "title mancante nella richiesta" });
        }

        const task = await Task.findOne({ where: { title, userId } });

        if (!task) return res.status(200).json([]);
        res.status(200).json([task]);

    } catch (error) {
        console.error("Errore nel recupero della task:", error);
        res.status(500).json({ message: "Errore nel server" });
    }
};

exports.update = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, completed } = req.body;
        const userId = req.user.userId;  // 🔹 Ottieni userId dal token

        if (!userId) {
            return res.status(401).json({ error: "Non autorizzato" });
        }

        const task = await Task.findOne({ where: { id: taskId, userId } });

        if (!task) {
            return res.status(404).json({ error: "Task non trovata o non autorizzato" });
        }

        console.log("Dati ricevuti dal client:", { taskId, title, description, completed });

        if (title) task.title = title;
        if (description) task.description = description;
        if (completed !== undefined) task.completed = completed;

        await task.save();  

        res.status(200).json({ message: "Task aggiornata", task });
    } catch (error) {
        console.error("Errore nell'aggiornamento della task:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

exports.delete = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user.userId;  // 🔹 Ottieni userId dal token

        if (!userId) {
            return res.status(401).json({ error: "Non autorizzato" });
        }

        console.log("Delete: taskId:", taskId);

        const task = await Task.findOne({ where: { id: taskId, userId } });

        if (!task) {
            return res.status(404).json({ error: "Task non trovata o non autorizzato" });
        }

        await task.destroy();

        res.status(200).json({ message: "Task eliminata" });
    } catch (error) {
        console.error("Errore nell'eliminazione della task:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};
