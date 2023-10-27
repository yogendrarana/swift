import { relations, InferModel } from "drizzle-orm";
import { boolean, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";


// import schemas
import { userSchema } from "./user.schema";
import { userToChat } from "./userToChat.join";


// schema definition
export const chatSchema = mysqlTable(
    'chat',

    {
        id: int('id').autoincrement().primaryKey(),
        isGroupChat: boolean('is_group_chat'),
        name: varchar('name', { length: 50 }),
        adminId: int('admin_id').references(() => userSchema.id),
        lastMessageAt: timestamp('last_message_at'),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    }
);


// relations
export const chatRelations = relations(chatSchema, ({ one, many }) => ({
    admin: one(userSchema, {fields: [chatSchema.adminId], references: [userSchema.id]}),
    members: many(userToChat),
}));


// type
export type ChatType = InferModel<typeof chatSchema>