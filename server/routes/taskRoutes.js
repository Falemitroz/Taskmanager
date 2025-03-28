const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const taskController = require("../controllers/taskController");

// Aggiungi il middleware di autenticazione alle rotte che necessitano di login
router.post("/create", authMiddleware, taskController.create);            
router.get("/user/:userId", authMiddleware, taskController.getAll);       
router.get("/title/:title", authMiddleware, taskController.getByTitle);   
router.patch("/update/:taskId", authMiddleware, taskController.update);   
// router.patch("/update-status/:taskId", authMiddleware, taskController.updateStatus);   
router.delete("/delete/:taskId", authMiddleware, taskController.delete);  

module.exports = router;
