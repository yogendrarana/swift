import { messageSchema } from "@/drizzle/schema/message.schema"
import { db } from "../db/db"
import { desc, eq } from "drizzle-orm"

const getLastMessageOfChat = async (chatId: number) => {
    const result = await db.select()
    .from(messageSchema)
    .where(eq(messageSchema.chatId, chatId))
    .orderBy(desc(messageSchema.createdAt));

    return result[0];
}

export default getLastMessageOfChat;