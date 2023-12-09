import { db } from "@/db/db";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// import schemas
import { messageSchema } from "@/db/drizzle/schema/message.schema";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const chatId = url.searchParams.get("chatId");
    

    if (!chatId) {
        return null;
    }

    const result = await db.select()
        .from(messageSchema)
        .where(eq(messageSchema.chatId, parseInt(chatId)))
        .orderBy(desc(messageSchema.createdAt))
        .limit(1);

    const message = result[0];

    return NextResponse.json({ message }, { status: 200 });
}