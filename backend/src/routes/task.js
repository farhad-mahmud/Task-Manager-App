const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/taskController');

router.get('/', getAllTasks);
router.post('/', createTask);
router.patch('/:id', updateTaskStatus);
router.delete('/:id', deleteTask);

module.exports = router;