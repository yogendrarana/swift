import { db } from "../db/db"
import { asc, eq } from "drizzle-orm"
import { messageSchema } from "@/drizzle/schema/message.schema"

const getChatMessages = async (chatId: number) => {
    const result = await db.query.messageSchema.findMany({
        where: eq(messageSchema.chatId, chatId),
        orderBy: asc(messageSchema.createdAt),
    })

    return result;
}

export default getChatMessages;