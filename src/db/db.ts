import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";


// import schemas
import { userSchema } from "../../drizzle/schema/user.schema";
import { chatSchema } from "../../drizzle/schema/chat.schema";
import { messageSchema } from "../../drizzle/schema/message.schema";
import { userToChat } from "../../drizzle/schema/userToChat.join";


// import relations
import { userRelations } from "../../drizzle/schema/user.schema";
import { chatRelations } from "../../drizzle/schema/chat.schema";
import { messageRelations } from "../../drizzle/schema/message.schema";
import { userToChatRelations } from "../../drizzle/schema/userToChat.join";


const pool = mysql.createPool({
    user: "root",
    password: "password",
    host: "localhost",
    database: "nextjschatapp",
});


export const db = drizzle(pool, {mode: "default", schema: { 
    userSchema,
    userRelations,
    chatSchema, 
    chatRelations,
    messageSchema,
    messageRelations,
    userToChat,
    userToChatRelations,
}});