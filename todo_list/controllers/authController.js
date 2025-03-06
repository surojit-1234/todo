import db from '../config/db.js';
import { comparePassword, generateToken, hashPassword, tokenVerify } from '../helper/authHelper.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
export const registerController = async (req, res) => {
    try {
        const { name, email, password, role_id, user_id } = req.body;
        if (!name || !email || !password || !role_id || !user_id) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const [exist] = await db.query(`SELECT * FROM user WHERE email = ?`, [email]);
        if (exist.length > 0) {
            return res.status(400).send({ message: "User already exists. Please login" });
        }

        const hashPass = await hashPassword(password);

        const [result] = await db.query(`INSERT INTO user (name, email, password, role_id, user_id) VALUES (?, ?, ?, ?, ?)`, [name, email, hashPass, role_id, user_id]);
        const token = generateToken({ id: result.insertId });

        res.status(200).send({
            success: true,
            message: 'Register successfully',
            user: {
                id: result.insertId,
                name, email, role_id
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const [user] = await db.query(`SELECT * FROM user WHERE email = ?`, [email]);

        if (!user.length > 0) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            });
        }

        const match = await comparePassword(password, user[0].password);
        if (!match) {
            return res.status(404).send({
                success: false,
                message: 'Invalid password'
            });
        }

        const token = generateToken({ id: user[0].id });
        res.status(200).send({
            success: true,
            message: 'Login successfully',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error,
        });
    }
};

 
export const forgetPassword = async (req, res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).send({message: "Email is required"});
        }
        const [user] = await db.query(`SELECT * FROM user WHERE email = ?`,[email]);
        if(user.length === 0){
            return res.status(404).send({
                success: false,
                message: "email is not register"
            });
        }
        const token = generateToken({id: user[0].id});
        res.status(200).send({
            success: true,
            message: "Password reset mail send",
            token,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login'
        })
    }
}


export const emailVerifyController = async (req, res) => {
    try {
        const { email } = req.body;

        // Generate a random verification token
        const verificationToken = crypto.randomBytes(20).toString('hex'); 

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', 
            port: 587, 
            secure: false, // Use TLS
            auth: {
                user: process.env.EMAIL,  // Your email
                pass: process.env.PASSWORD,  // Your email password or app password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL, 
            to: email,
            subject: 'Email Verification',
            text: `Click here to verify your email: https://your-frontend-url.com/verify-email?token=${verificationToken}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ message: 'Error sending verification email', error: err });
            }

            res.status(200).json({ message: 'Verification email sent successfully!' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in Email Verification',
            error,
        });
    }
};

export const resetController = async (req, res) => {
    try {
        const {id} = req.params;
        const { token } = req.body;
        const { newPassword } = req.body;
        // console.log(token);
        if (!newPassword) {
            return res.status(400).send({ message: "New password is required" });
        }

        const decoded = tokenVerify(token);
        // console.log(decoded);
        // const userId = decoded.id;

        const [user] = await db.query('SELECT * FROM user WHERE id = ?', [id]);
        // console.log(user);
        if (user.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        const hashPass = await hashPassword(newPassword);
        await db.query('UPDATE user SET password = ? WHERE id = ?', [hashPass, id]);

        res.status(200).send({
            success: true,
            message: 'Password reset successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in resetting password',
            error,
        });
    }
};
