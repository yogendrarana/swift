import { InferModel } from 'drizzle-orm';
import { int, mysqlTable, text } from "drizzle-orm/mysql-core";

// schema definition
export const avatarSchema = mysqlTable(
    'avatar',

    {
        id: int('id').autoincrement().primaryKey(),
        url: text('url').notNull()
    }
)

// type
export type AvatarType = InferModel<typeof avatarSchema>