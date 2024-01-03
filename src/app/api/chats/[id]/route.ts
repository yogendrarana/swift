import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { pusherServer } from "@/pusher/pusher";
import { NextRequest, NextResponse } from "next/server";

// import schema
import { chatSchema } from "@/db/drizzle/schema/chat.schema";
import { userSchema } from "@/db/drizzle/schema/user.schema";
import { userToChat } from "@/db/drizzle/schema/userToChat.join";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        const chatId = parseInt(params.id);

        // get chat with members
        type MemberType = { email: string }[];
        const members: MemberType = await db.select({ email: userSchema.email }).from(userSchema).innerJoin(userToChat, eq(userToChat.userId, userSchema.id)).where(eq(userToChat.chatId, chatId));

        // delete from userToChat
        await db.delete(userToChat).where(eq(userToChat.chatId, chatId));

        // delete chat
        await db.delete(chatSchema).where(eq(chatSchema.id, chatId));

        // for pusher
        await Promise.all(members.map(async (member: { email: string }) => {
            await pusherServer.trigger(member.email, 'chat:delete', { chatId });
        }));

        return NextResponse.json({ success: true, message: "Chat deleted successfully" }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 })
    }
}