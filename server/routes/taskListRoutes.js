const express = require("express");
const router = express.Router();

const taskListController = require("../controllers/taskListController");

router.post("/create", taskListController.create);            
router.get("/", taskListController.getAll);       
router.get("/name/:name", taskListController.getByName);   
router.patch("/update/:taskListId", taskListController.update);   
router.delete("/delete/:taskListId", taskListController.delete);  

module.exports = router;
