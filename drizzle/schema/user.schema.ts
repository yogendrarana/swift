import { InferModel, relations } from 'drizzle-orm';
import { boolean, mysqlEnum, mysqlTable, int, text, varchar, timestamp } from 'drizzle-orm/mysql-core';

// import schemas
import { chatSchema } from './chat.schema';
import { userToChat } from './userToChat.join';


// schema definition
export const userSchema = mysqlTable(
    'user',

    {
        id: int('id').autoincrement().primaryKey(),
        name: varchar('name', { length: 50 }).notNull(),
        email: varchar('email', { length: 255 }).notNull().unique(),
        isVerified: boolean('is_verified'),
        password: varchar('password', { length: 255 }).notNull(),
        role: mysqlEnum('role', ['admin', 'user']).notNull().default('user'),
        image: text('image'),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    }
);


// relations
export const userRelations = relations(userSchema, ({ many }) => ({
    adminOfChats: many(chatSchema),
    memberOfChats: many(userToChat),
}));


// type
export type UserType = InferModel<typeof userSchema>
