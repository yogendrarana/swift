import { db } from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";

// import actions
import getCurrentUser from "@/src/actions/getCurrentUser";

// import schemas
import { messageSchema } from "@/drizzle/schema/message.schema";
import { eq } from "drizzle-orm";
import { chatSchema } from "@/drizzle/schema/chat.schema";


export async function POST (req: NextRequest) {
    const body= await req.json();
    const { text, chatId, image, publicId } = body;

    const currentUser = await getCurrentUser();

    try {
        if (!text && !image) {
            throw new Error("Missing text or image.");
        }

        if (!currentUser?.id || !currentUser?.email) {
            throw new Error("Unauthorized action.");
        }

        await db.insert(messageSchema).values({
            chatId: chatId,
            senderId: currentUser.id,
            text: text,
            image: image,
            imagePublicId: publicId,
        })

        // update the last message at field in the chat
        await db.update(chatSchema).set({ lastMessageAt: new Date() }).where(eq(chatSchema.id, chatId));

        return NextResponse.json({ success: true, message: "Message sent successfully." }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

}