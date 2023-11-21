import { db } from "@/src/db/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// pusher
import { pusherServer } from "@/src/pusher/pusher";

// import actions
import getCurrentUser from "@/src/actions/getCurrentUser";

// import schemas
import { chatSchema } from "@/drizzle/schema/chat.schema";
import { messageSchema } from "@/drizzle/schema/message.schema";
import { userSchema } from "@/drizzle/schema/user.schema";
import { userToChat } from "@/drizzle/schema/userToChat.join";


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

        // pusher trigger for message body
        pusherServer.trigger(chatId, "message:new", newMessage);

        // pusher trigger for chat list
        const members = await db.select({ email: userSchema.email, }).from(userSchema).innerJoin(userToChat, eq(userToChat.userId, userSchema.id)).where(eq(userToChat.chatId, chatId));
        members.forEach((user: any) => {
            pusherServer.trigger(`chat-${user.email}`, "chat:update", {id: chatId, newMessage});
        })

        return NextResponse.json({ success: true, message: "Message sent successfully." }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

}