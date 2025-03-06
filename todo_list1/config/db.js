import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const mySqlPool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});
export default mySqlPool
