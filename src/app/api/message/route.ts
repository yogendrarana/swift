import { db } from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";

// import actions
import getCurrentUser from "@/src/actions/getCurrentUser";

// import schemas
import { messageSchema } from "@/drizzle/schema/message.schema";


export async function POST (req: NextRequest) {
    const { text, chatId, image } = await req.json();
    const currentUser = await getCurrentUser();

    try {
        if (!text || !chatId) {
            throw new Error("Missing text, image or chat id.");
        }

        if (!currentUser?.id || !currentUser?.email) {
            throw new Error("Unauthorized action.");
        }

        const response = await db.insert(messageSchema).values({
            chatId: chatId,
            senderId: currentUser.id,
            text: text,
            image: image,
        })

        console.log(response);



        return NextResponse.json({ success: true, message: "Chat created successfully." }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

}