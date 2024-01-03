import type { Config } from 'drizzle-kit';

export default {
    schema: "./src/db/drizzle/schema",
    out: "./src/db/drizzle/migrations",
    driver: "mysql2",
    dbCredentials: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST as string,
        database: process.env.DB_NAME as string,
        port: Number(process.env.DB_PORT)
    }

} satisfies Config;