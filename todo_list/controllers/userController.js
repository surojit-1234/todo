import db from '../config/db.js';
import { hashPassword} from '../helper/authHelper.js';

// Helper function for checking permissions based on roles
export const hasPermission = (role, action) => {
    const permissions = {
        Admin: { Create: true, Read: true, Update: true, Delete: true },
        Editor: { Create: true, Read: true, Update: true, Delete: false },
        User: { Create: true, Read: true, Update: false, Delete: false }
    };

    return permissions[role] && permissions[role][action];
};

// Create User
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role_id, user_id } = req.body;

        // Validate the input fields
        if (!name || !email || !password || !role_id || !user_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the email already exists
        const [existingUser] = await db.query(`SELECT * FROM user WHERE email = ?`, [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Hash password
        const hashPassword = await hashPassword(password);

        // Insert user into the database
        const [result] = await db.query(`INSERT INTO user (name, email, password, role_id, user_id) VALUES (?, ?, ?, ?, ?)`, 
            [name, email, hashPassword, role_id, user_id]);

        res.status(201).json({
            message: 'User created successfully',
            user: { id: result.insertId, name, email, role_id }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Get All Users (Read List)
export const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query(`SELECT * FROM user`);
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

// Get Single User (Read Single)
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [user] = await db.query(`SELECT * FROM user WHERE id = ?`, [id]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: user[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user', error });
    }
};

// Update User (Update List)
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role_id } = req.body;

    try {
        // Check if user exists
        const [user] = await db.query(`SELECT * FROM user WHERE id = ?`, [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optionally, hash password if it's provided
        let updatedPassword = user[0].password;
        if (password) {
            updatedPassword = await hashPassword(password);
        }

        // Update user in the database
        const [result] = await db.query(`
            UPDATE user
            SET name = ?, email = ?, password = ?, role_id = ?
            WHERE id = ?`,
            [name || user[0].name, email || user[0].email, updatedPassword, role_id || user[0].role_id, id]
        );

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete User (Delete List)
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if user exists
        const [user] = await db.query(`SELECT * FROM user WHERE id = ?`, [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete user from the database
        await db.query(`DELETE FROM user WHERE id = ?`, [id]);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

//