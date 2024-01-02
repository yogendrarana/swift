import mysql2 from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";


// import schemas
import { userSchema } from "./drizzle/schema/user.schema";
import { chatSchema } from "./drizzle/schema/chat.schema";
import { userToChat } from "./drizzle/schema/userToChat.join";
import { messageSchema } from "./drizzle/schema/message.schema";


// import relations
import { userRelations } from "./drizzle/schema/user.schema";
import { chatRelations } from "./drizzle/schema/chat.schema";
import { messageRelations } from "./drizzle/schema/message.schema";
import { userToChatRelations } from "./drizzle/schema/userToChat.join";


const pool = mysql2.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});


export const db = drizzle(pool, {
    mode: "default", schema: {
        userSchema,
        userRelations,
        chatSchema,
        chatRelations,
        messageSchema,
        messageRelations,
        userToChat,
        userToChatRelations,
    }
});