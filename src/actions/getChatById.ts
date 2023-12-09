import { db } from "../db/db"
import { eq } from "drizzle-orm"

// import schemas
import { chatSchema } from "@/db/drizzle/schema/chat.schema"

// import action
import getCurrentUser from "./getCurrentUser";

const getChatById = async (chatId: number) => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
        return null;
    }

    const result = await db.query.chatSchema.findFirst({
        where: eq(chatSchema.id, chatId),
        with: {
            admin: true,
            members: {
                columns: {
                    userId: false,
                    chatId: false,
                },
                with: {
                    user: true,
                }
            },
        }
    })
    
    return result;
}

export default getChatById;