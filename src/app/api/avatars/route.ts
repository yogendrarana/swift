import { db } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
    const result = await db.query.avatarSchema.findMany();
    return NextResponse.json({ success: true, message: "Avatars fetched successfully", avatars: result }, { status: 200 })
}