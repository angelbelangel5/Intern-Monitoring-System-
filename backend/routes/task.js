const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/tasks', authMiddleware, taskController.createTask);
router.get('/tasks/intern/:internId', authMiddleware, taskController.getTasksByIntern);
router.put('/tasks/:taskId', authMiddleware, taskController.updateTaskStatus);

module.exports = router;
