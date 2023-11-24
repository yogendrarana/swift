import { InferModel, relations } from 'drizzle-orm';
import { mysqlTable, int, text, timestamp } from 'drizzle-orm/mysql-core';


// import schemas
import { userSchema } from './user.schema';
import { chatSchema } from './chat.schema';


export const messageSchema = mysqlTable(
    'message',

    {
        id: int('id').autoincrement().primaryKey(),
        text: text('text'),
        image: text('image'),
        imagePublicId: text('image_public_id'),
        
        chatId: int('chat_id').notNull().references(() => chatSchema.id, {onDelete: 'cascade'}),
        senderId: int('sender_id').notNull().references(() => userSchema.id, {onDelete: 'cascade'}),

        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    }
);


// relations works in application level while foreign keys works in database level 
export const messageRelations = relations(messageSchema, ({ one }) => ({
    chat: one(chatSchema, {fields: [messageSchema.chatId], references: [chatSchema.id]}),
    sender: one(userSchema, {fields: [messageSchema.senderId], references: [userSchema.id]}),
}));


// type
export type MessageType = InferModel<typeof messageSchema>