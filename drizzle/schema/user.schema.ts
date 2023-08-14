import { boolean, mysqlEnum, mysqlTable, int, text, uniqueIndex, varchar, timestamp } from 'drizzle-orm/mysql-core';

// declaring enum in database
export const userSchema = mysqlTable(
    'user',

    {
        id: int('id').autoincrement().primaryKey(),
        name: varchar('name', {length: 100}).notNull(),
        email: varchar('email', { length: 256 }).notNull().unique(),
        isEmailVerified: boolean('is_email_verified'),
        password: varchar('password', { length: 256 }).notNull(),
        role: mysqlEnum('role', ['admin', 'user']).notNull().default('user'),
        image: text('image'),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    }
);