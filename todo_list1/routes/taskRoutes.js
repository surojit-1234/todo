import express from 'express';
const router = express.Router();
import {
    getTasksController,
    getTaskController,
    createTaskController,
    updateTaskController,
    deleteTaskController,
    completeStatusController
} from "../controllers/taskController.js";

// Get all tasks
router.get('/get-task', getTasksController);

// Get a specific task by ID
router.get('/get-single-task/:id', getTaskController);

// Create a new task
router.post('/create-task', createTaskController);

// Update task details by ID
router.put('/update-task/:id', updateTaskController);

// Delete task by ID
router.delete('/delete-task/:id', deleteTaskController);

router.put('/status/:id', completeStatusController);


export default router;


  