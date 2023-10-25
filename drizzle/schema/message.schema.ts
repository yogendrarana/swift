import { InferModel, relations } from 'drizzle-orm';
import { mysqlTable, int, text, timestamp } from 'drizzle-orm/mysql-core';


// import schemas
import { userSchema } from './user.schema';
import { chatSchema } from './chat.schema';


export const messageSchema = mysqlTable(
    'message',

    {
        id: int('id').autoincrement().primaryKey(),
        chatId: int('chat_id').notNull(),
        senderId: int('sender_id').notNull(),
        receiverId: int('receiver_id').notNull(),
        text: text('text').notNull(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    }
);


// relations
export const messageRelations = relations(messageSchema, ({ one }) => ({
    chat: one(chatSchema, {fields: [messageSchema.chatId], references: [chatSchema.id]}),
    sender: one(userSchema, {fields: [messageSchema.senderId], references: [userSchema.id]}),
    receiver: one(userSchema, {fields: [messageSchema.receiverId], references: [userSchema.id]}),
}));


// type
export type MessageType = InferModel<typeof messageSchema>