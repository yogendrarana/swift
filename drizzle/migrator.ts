import path from "path";
import mysql2 from "mysql2/promise"
import { drizzle } from "drizzle-orm/mysql2"
import { migrate } from "drizzle-orm/mysql2/migrator"

const doMigrate = async () => {
    try {
        const connection = await mysql2.createConnection({
            user: "root",
            password: "password",
            host: "localhost",
            database: "nextjschatapp",
        })

        const db = drizzle(connection);

        await migrate(db, { migrationsFolder: path.resolve("drizzle", "migrations") });

        console.log("Migration Successful");
        process.exit(0);
    } catch (err: any) {
        console.log("Migration Error: ", err.message);
        process.exit(0);
    }
}

doMigrate();