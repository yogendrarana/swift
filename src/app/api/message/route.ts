import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// pusher
import { pusherServer } from "@/pusher/pusher";

// import actions
import getCurrentUser from "@/actions/getCurrentUser";

// import schemas
import { chatSchema } from "@/db/drizzle/schema/chat.schema";
import { userSchema } from "@/db/drizzle/schema/user.schema";
import { userToChat } from "@/db/drizzle/schema/userToChat.join";
import { messageSchema } from "@/db/drizzle/schema/message.schema";


export async function POST(req: NextRequest) {
    const body = await req.json();
    const { text, chatId, image, publicId } = body;

    const currentUser = await getCurrentUser();

    try {
        if (!text && !image) {
            throw new Error("Missing text or image.");
        }

        if (!currentUser?.id || !currentUser?.email) {
            throw new Error("Unauthorized action.");
        }

        const response = await db.insert(messageSchema).values({
            chatId: chatId,
            senderId: currentUser.id,
            text: text,
            image: image,
            imagePublicId: publicId,
        })

        // inserted message
        const insertId = response[0].insertId;
        const newMessage = await db.query.messageSchema.findFirst({
            where: eq(messageSchema.id, insertId),
            with: {
                sender: true
            }
        });

        // update the last message at field in the chat
        await db.update(chatSchema).set({ lastMessageAt: new Date() }).where(eq(chatSchema.id, chatId));

        // pusher triggers
        pusherServer.trigger(chatId, "message:create", newMessage);
    
        const members: { email: string }[] = await db.select({ email: userSchema.email }).from(userSchema).innerJoin(userToChat, eq(userToChat.userId, userSchema.id)).where(eq(userToChat.chatId, chatId));
        members.forEach((member: { email: string }) => {
            // for last message
            pusherServer.trigger(member.email, "message:create", { newMessage });

            // for update chat list order
            pusherServer.trigger(member.email, "chat-list:update", { chatId });
        })

        return NextResponse.json({ success: true, message: "Message sent successfully." }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

}