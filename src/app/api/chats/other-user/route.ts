import { userSchema } from "@/drizzle/schema/user.schema";
import { userToChat } from "@/drizzle/schema/userToChat.join";
import getCurrentUser from "@/src/actions/getCurrentUser";
import { db } from "@/src/db/db";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const chatId = url.searchParams.get("chatId");

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
        return null;
    }

    if (!chatId) {
        return null;
    }

    const result = await db.select()
    .from(userToChat)
    .where(
        and(
            eq(userToChat.chatId, parseInt(chatId)),
            not(eq(userToChat.userId, currentUser.id))
        )
    )

    const userId = result[0].userId;

    const user = await db.select().from(userSchema).where(eq(userSchema.id, userId))
    
    if (!user[0]) {
        return null;
    }

    return NextResponse.json({ user: user[0] }, { status: 200 });
}
