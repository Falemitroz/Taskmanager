const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const taskController = require("../controllers/taskController");

// Aggiungi il middleware di autenticazione alle rotte che necessitano di login
router.post("/", authMiddleware, taskController.create);          // Crea una task
router.patch("/:taskId", authMiddleware, taskController.update);   // Aggiorna una task
router.delete("/:taskId", authMiddleware, taskController.delete); // Elimina una task
router.get("/", authMiddleware, taskController.getAll);           // Ottieni tutte le task
router.get("/:title", authMiddleware, taskController.getByTitle); // Ottieni task per titolo

module.exports = router;
