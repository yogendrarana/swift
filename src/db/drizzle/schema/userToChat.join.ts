import { relations } from "drizzle-orm";
import { boolean, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";

// import schemas
import { userSchema } from "./user.schema";
import { chatSchema } from "./chat.schema";

// schema definition
export const userToChat = mysqlTable(
    'user_to_chat', 

    {
        userId: int('user_id').notNull().references(() => userSchema.id),
        chatId: int('chat_id').notNull().references(() => chatSchema.id),
        isGroupChat: boolean('is_group_chat').notNull(),
    },

    (t) => ({
        pk: primaryKey(t.userId, t.chatId),
    }),
);


// relations
export const userToChatRelations = relations(userToChat, ({ one }) => ({
    user: one(userSchema, {fields: [userToChat.userId], references: [userSchema.id]}),
    chat: one(chatSchema, {fields: [userToChat.chatId], references: [chatSchema.id]}),
}));