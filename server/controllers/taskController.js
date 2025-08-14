const { where } = require("sequelize");
const Task = require("../models/Task");

exports.create = async (req, res) => {
    try {
        const { title, description, taskListId } = req.body;

        const newTask = await Task.create({ title, description, taskListId });

        res.status(201).json({ message: "Task creato", newTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
  try {
    const { taskListId } = req.params;
    const tasks = await Task.findAll({ 
      where: { taskListId },
      order: [['createdAt', 'DESC']] // dalla più recente alla più vecchia
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Errore nel recupero delle tasks:", error);
    res.status(500).json({ message: "Errore nel server" });
  }
};


exports.update = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, completed } = req.body;
        const task = await Task.findOne({ where: { id: taskId } });
        if (!task) {
            return res.status(404).json({ error: "Task non trovata" });
        }
        if(title !== undefined) task.title = title;
        if(description !== undefined) task.description = description;
        if(completed !== undefined) task.completed = completed;
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
        const task = await Task.findOne({ where: { id: taskId } });
        if (!task) {
            return res.status(404).json({ error: "Task non trovata" });
        }
        await task.destroy();
        res.status(200).json({ message: "Task eliminata" });
    } catch (error) {
        console.error("Errore nell'eliminazione della task:", error);
        res.status(500).json({ error: "Errore nel server" });
    }
};
