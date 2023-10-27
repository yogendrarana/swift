import { db } from "@/src/db/db";
import { desc, eq, sql } from "drizzle-orm";
import getCurrentUser from "./getCurrentUser"
import { chatSchema } from "../../drizzle/schema/chat.schema";
import { userToChat } from "../../drizzle/schema/userToChat.join";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";

const getChats = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
        return [];
    }

    try {

        const result: MySqlRawQueryResult = await db.execute(sql`
            SELECT ${chatSchema}.*
            FROM ${chatSchema}
            INNER JOIN ${userToChat}
            ON ${chatSchema.id} = ${userToChat.chatId}
            WHERE ${userToChat.userId} = ${currentUser.id}
            ORDER BY ${chatSchema.lastMessageAt} DESC
        `)

        const chats: any[] = result;

        console.log(chats[0]);

        return chats[0];

    }catch (error: any) {
        return [];
    }
}

export default getChats;