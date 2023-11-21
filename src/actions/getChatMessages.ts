import { db } from "../db/db"
import { asc, eq } from "drizzle-orm"

// import schemas
import { messageSchema } from "@/drizzle/schema/message.schema"

const getChatMessages = async (chatId: number) => {
    const result = await db.query.messageSchema.findMany({
        where: eq(messageSchema.chatId, chatId),
        orderBy: asc(messageSchema.createdAt),
        with: {
            sender: true
        }
    })

    if (result.length === 0) {
        return [];
    }

    return result;
}

export default getChatMessages;