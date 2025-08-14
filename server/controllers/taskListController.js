const TaskList = require("../models/TaskList");

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const newTaskList = await TaskList.create({ name });
        res.status(201).json({ message: "TaskList creato", newTaskList });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
  try {
    const taskLists = await TaskList.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(taskLists);
  } catch (error) {
    console.error("Errore nel recupero delle taskLists:", error);
    res.status(500).json({ message: "Errore nel server" });
  }
};

exports.getByName = async (req, res) => {
    try {
        const { name } = req.params;
        if (!name) {
            return res.status(400).json({ error: "name mancante nella richiesta" });
        }
        const taskList = await TaskList.findOne({ where: { name } });
        if (!taskList) return res.status(200).json([]);
        res.status(200).json([taskList]);
    } catch (error) {
        console.error("Errore nel recupero della taskList:", error);
        res.status(500).json({ message: "Errore nel server" });
    }
};

exports.update = async (req, res) => {
    try {
        const { taskListId } = req.params;
        const { name } = req.body;
        const taskList = await TaskList.findOne({ where: { id: taskListId } });
        if (!taskList) {
            return res.status(404).json({ error: "TaskList non trovata" });
        }
        if(name) taskList.name = name;
        await taskList.save();  
        res.status(200).json({ message: "TaskList aggiornata", taskList });
    } catch (error) {
        console.error("Errore nell'aggiornamento della taskList:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};

exports.delete = async (req, res) => {
    try {
        const { taskListId } = req.params;
        const taskList = await TaskList.findOne({ where: { id: taskListId } });
        if (!taskList) {
            return res.status(404).json({ error: "TaskList non trovata" });
        }
        await taskList.destroy();
        res.status(200).json({ message: "TaskList eliminata" });
    } catch (error) {
        console.error("Errore nell'eliminazione della taskList:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};
