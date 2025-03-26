const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const taskController = require("../controllers/taskController");

// Aggiungi il middleware di autenticazione alle rotte che necessitano di login
router.post("/create", authMiddleware, taskController.create);          // Crea una task
router.get("/user/:userId", authMiddleware, taskController.getAll);           // Ottieni tutte le task
router.get("/title/:title", authMiddleware, taskController.getByTitle); // Ottieni task per titolo
router.patch("/update/:taskId", authMiddleware, taskController.update);   // Aggiorna una task
router.delete("/delete/:taskId", authMiddleware, taskController.delete); // Elimina una task

module.exports = router;
