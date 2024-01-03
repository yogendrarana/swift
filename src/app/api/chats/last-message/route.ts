import { db } from "@/db/db";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// import schemas
import { messageSchema } from "@/db/drizzle/schema/message.schema";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const chatId = url.searchParams.get("chatId");
    
    if (!chatId) {
        return new NextResponse(null, { status: 400 });
    }

    try {
        const result = await db.select()
            .from(messageSchema)
            .where(eq(messageSchema.chatId, parseInt(chatId)))
            .orderBy(desc(messageSchema.createdAt))
            .limit(1);
        
        const message = result[0];
        
        return new NextResponse(JSON.stringify(message), { status: 200 });

    } catch (err: any) {
        return new NextResponse("Error fetching message", { status: 500 });
    }
}
