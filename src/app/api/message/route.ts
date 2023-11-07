import { db } from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";

// import actions
import getCurrentUser from "@/src/actions/getCurrentUser";

// import schemas
import { messageSchema } from "@/drizzle/schema/message.schema";


export async function POST (req: NextRequest) {
    const body= await req.json();
    const { text, chatId, image, publicId } = body;

    console.log("body", body)

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
            publicId: publicId,
        })

        return NextResponse.json({ success: true, message: "Message sent successfully." }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

}