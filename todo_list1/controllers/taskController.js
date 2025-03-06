import db from '../config/db.js'; // Make sure to import the db connection

// Get all tasks
export const getTasksController = async (req, res) => {
    try {
        const [tasks] = await db.query('SELECT * FROM task_list');
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error });
    }
};

// Get a specific task by ID
export const getTaskController = async (req, res) => {
    const { id } = req.params;
    try {
        const [task] = await db.query('SELECT * FROM task_list WHERE id = ?', [id]);
        if (task.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ task: task[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving task', error });
    }
};

// Create a new task
export const createTaskController = async (req, res) => {
    const { title, description, user_id } = req.body;
    if (!title || !description || !user_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO task_list (title, description, user_id) VALUES (?, ?, ?)',
            [title, description, user_id]
        );
        res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

// Update task details by ID
export const updateTaskController = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [result] = await db.query(
            'UPDATE task_list SET title = ?, description = ? WHERE id = ?',
            [title, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Delete task by ID
export const deleteTaskController = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM task_list WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
