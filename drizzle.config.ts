import type { Config } from 'drizzle-kit';

export default {
    schema: "./src/db/drizzle/schema",
    out: "./src/db/drizzle/migrations",
    driver: "mysql2",
    dbCredentials: {
        host: "hobby-mysql-hobby.a.aivencloud.com",
        port: 20842,
        user: "avnadmin",
        password: "AVNS_R9y_Rat7UKljgJ-iSQA",
        database: "defaultdb",
    }

} satisfies Config;