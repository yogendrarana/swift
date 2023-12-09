import { db } from "../db/db"
import { desc, eq } from "drizzle-orm"

// import schema
import { messageSchema } from "@/db/drizzle/schema/message.schema"

const getLastMessageOfChat = async (chatId: number) => {
    const result = await db.select()
    .from(messageSchema)
    .where(eq(messageSchema.chatId, chatId))
    .orderBy(desc(messageSchema.createdAt))
    .limit(1);

    return result[0];
}

export default getLastMessageOfChat;