import express from 'express';
import { createUser, deleteUser, getAllUsers,  getUserById, updateUser } from '../controllers/userController.js';
import { emailVerifyController, forgetPassword, loginController, registerController, resetController } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController)
router.post('/email-verify', emailVerifyController);
// router.get('/get-user', getAllUser);
// router.get('/get-single-user/:id', getSingleUser);
//router.post('/forgetMail', forgetPassword);
router.post('/resetPass/:id', resetController);

router.post('/create-users', createUser);               // Create a user
router.get('/get-users', getAllUsers);               // Get all users
router.get('/get-single-users/:id', getUserById);           // Get single user by ID
router.put('/update-users/:id', updateUser);            // Update user by ID
router.delete('/delete-users/:id', deleteUser);         // Delete user by ID

  
export default router;

