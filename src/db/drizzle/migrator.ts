import path from "path";
import mysql2 from "mysql2/promise"
import { drizzle } from "drizzle-orm/mysql2"
import { migrate } from "drizzle-orm/mysql2/migrator"

const doMigrate = async () => {
    try {
        const connection = mysql2.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT)
        });

        const db = drizzle(connection);

        await migrate(db, { migrationsFolder: path.resolve("src", "db", "drizzle", "migrations") });

        console.log("Migration Successful");
        process.exit(0);
    } catch (err: any) {
        console.log("Migration Error: ", err.message);
        process.exit(0);
    }
}

doMigrate();