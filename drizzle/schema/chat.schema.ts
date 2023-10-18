import { boolean, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

// import schemas
import { userSchema } from "./user.schema";

export const chatSchema = mysqlTable(
    'chat',

    {
        id: int('id').autoincrement().primaryKey(),
        isGroup: boolean('is_group').notNull(),
        name: varchar('name', { length: 50 }).notNull(),
        adminId: int('admin_id').references(() => userSchema.id),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    }
);