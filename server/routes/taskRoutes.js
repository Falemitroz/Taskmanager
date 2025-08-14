const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

router.post("/create", taskController.create);            
router.get("/:taskListId", taskController.getAll);         
router.patch("/update/:taskId", taskController.update);   
router.delete("/delete/:taskId", taskController.delete);  

module.exports = router;
