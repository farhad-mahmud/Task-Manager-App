const pool = require('../db');

// GET all tasks
const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to fetch tasks' });
  }
};

    // post task
const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, status) 
       VALUES ($1, $2, COALESCE($3, 'To Do')::task_status) 
       RETURNING *`,
      [title, description, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to create task' });
  }
};

   // change task status .
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'status is required' });
  }

  try {
    const result = await pool.query(
      `UPDATE tasks SET status = $1::task_status, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'task not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

  // delete task 
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'task not found' });
    }

    res.json({ message: 'task deleted', task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to delete task' });
  }
};

module.exports = { getAllTasks, createTask, updateTaskStatus, deleteTask };