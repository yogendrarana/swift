import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = mysql.createPool({
    user: "root",
    password: "password",
    host: "localhost",
    database: "nextjschatapp",
});

export const db = drizzle(pool);