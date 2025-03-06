import express from 'express';
import mySqlPool from "./config/db.js";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json()); 

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello");
})
app.use("/api/user",userRoutes);
app.use("/api/task",taskRoutes);

const PORT = process.env.PORT;

mySqlPool
    .query('SELECT 1')
    .then(() => {
        console.log('Database connection successfully');
        app.listen(process.env.PORT, () => {
            console.log(`server running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });