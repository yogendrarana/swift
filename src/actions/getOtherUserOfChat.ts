import { db } from "../db/db"
import { and, eq, not } from "drizzle-orm"
import getCurrentUser from "./getCurrentUser";
import { userSchema } from "@/drizzle/schema/user.schema";
import { userToChat } from "@/drizzle/schema/userToChat.join"

const getOtherUserOfChat = async (chatId: number) => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
        return null;
    }

    const result = await db.select()
    .from(userToChat)
    .where(
        and(
            eq(userToChat.chatId, chatId),
            not(eq(userToChat.userId, currentUser.id))
        )
    )

    const userId = result[0].userId;
    const user = await db.select() 
    .from(userSchema) 
    .where(eq(userSchema.id, userId))
    
    if (!user[0]) {
        return null;
    }
    
    return user[0];


}

export default getOtherUserOfChat;