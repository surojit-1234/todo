import db from '../config/db.js';

// RBAC Middleware
const rbac = (action) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id; // Assumes user is authenticated and user object is in the request.
            const [user] = await db.query('SELECT role_id FROM users WHERE id = ?', [userId]);

            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const roleId = user[0].role_id;
            const [role] = await db.query('SELECT name FROM roles WHERE id = ?', [roleId]);

            if (role.length === 0) {
                return res.status(404).json({ message: 'Role not found' });
            }

            const roleName = role[0].name;

            // Define permissions for each role
            const permissions = {
                Admin: { create: true, read: true, update: true, delete: true },
                Editor: { create: true, read: true, update: true, delete: false },
                User: { create: true, read: true, update: false, delete: false }
            };

            const hasPermission = permissions[roleName] && permissions[roleName][action];

            if (!hasPermission) {
                return res.status(403).json({ message: `You do not have permission to ${action}` });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: 'Error checking permissions', error });
        }
    };
};

export default rbac;

 