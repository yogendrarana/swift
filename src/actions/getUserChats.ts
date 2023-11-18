import { db } from "@/src/db/db";
import { sql } from "drizzle-orm";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";
import getCurrentUser from "./getCurrentUser";
import { chatSchema } from "../../drizzle/schema/chat.schema";
import { userToChat } from "../../drizzle/schema/userToChat.join";

const getUserChats = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
        return [];
    }

    try {
        const result: MySqlRawQueryResult = await db.execute(sql`
            SELECT ${chatSchema}.*
            FROM ${chatSchema} INNER JOIN ${userToChat}
            ON ${chatSchema.id} = ${userToChat.chatId}
            WHERE ${userToChat.userId} = ${currentUser.id}
            ORDER BY ${chatSchema.lastMessageAt} DESC
        `);

        const chats: any[] = result;

        return chats[0];
    } catch (error: any) {
        return [];
    }
};

export default getUserChats;
