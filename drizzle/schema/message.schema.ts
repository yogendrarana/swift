import { mysqlTable, int, text, timestamp } from 'drizzle-orm/mysql-core';

// import schemas
import { userSchema } from './user.schema';

export const messageSchema = mysqlTable(
    'message',

    {
        id: int('id').autoincrement().primaryKey(),
        chatId: int('chat_id').notNull(),
        senderId: int('sender_id').notNull().references(() => userSchema.id),
        receiverId: int('receiver_id').notNull().references(() => userSchema.id),
        text: text('text').notNull(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    }
);