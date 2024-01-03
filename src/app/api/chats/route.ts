import { db } from "@/db/db";
import { eq, sql } from "drizzle-orm";
import { pusherServer } from "@/pusher/pusher";
import { NextRequest, NextResponse } from "next/server";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";

// import actions
import getCurrentUser from "@/actions/getCurrentUser";

// import schemas
import { chatSchema } from "@/db/drizzle/schema/chat.schema";
import { userToChat } from "@/db/drizzle/schema/userToChat.join";
import { userSchema } from "@/db/drizzle/schema/user.schema";


// define type
type MemberType = {
    value: number;
    label: string;
    email: string;
};


export async function POST(req: NextRequest) {
    const body = await req.json();
    const { otherUserId, isGroupChat, members, name } = body;

    const currentUser = await getCurrentUser();

    try {
        if (!currentUser?.id || !currentUser?.email) {
            return NextResponse.json({ success: false, message: "Unauthorized request." }, { status: 400 });
        }

        if (isGroupChat == false && !otherUserId) {
            return NextResponse.json({ success: false, message: "Other user ID not provided." }, { status: 400 });
        }

        if (isGroupChat && (!members || members.length == 0 || !name)) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        if (isGroupChat) {
            // create new group chat
            const newChatResult = await db.insert(chatSchema).values({ isGroupChat: true, name, adminId: currentUser.id });
            const insertedChatId = newChatResult[0].insertId;

            // insert members into userToChat
            members.forEach(async (member: MemberType) => {
                await db.insert(userToChat).values({
                    chatId: insertedChatId,
                    userId: member.value,
                    isGroupChat: isGroupChat,
                })
            });

            // insert current user into userToChat
            await db.insert(userToChat).values({
                chatId: insertedChatId,
                userId: currentUser.id,
                isGroupChat: isGroupChat,
            })

            // new chat
            const newChat = await db.query.chatSchema.findFirst({
                where: eq(chatSchema.id, insertedChatId),
            });

            // pusher server
            await Promise.all(members.map(async (member: MemberType) => {
                await pusherServer.trigger(member.email, "chat:create", { newChat });
            }));



            return NextResponse.json({ success: true, message: "Chat created successfully.", chatId: insertedChatId }, { status: 201 });
        }

        const query_result: MySqlRawQueryResult = await db.execute(
            sql` 
                SELECT UC1.chat_id
                FROM  ${userToChat} AS UC1
                JOIN  ${userToChat} AS UC2 ON UC1.chat_id = UC2.chat_id
                WHERE UC1.user_id = ${otherUserId}
                    AND UC2.user_id = ${currentUser.id}
                    AND UC1.is_group_chat = FALSE
                    AND UC2.is_group_chat = FALSE;
            `
        );

        const query_result_array: any[] = query_result; // to remove ts error
        const existing_chat = query_result_array[0][0]; // get the first array of the result, and get the first element of that array

        if (query_result_array[0].length === 0) {
            // create new chat 
            const newChatResult = await db.insert(chatSchema).values({ isGroupChat: false });
            const insertedChatId = newChatResult[0].insertId;

            [currentUser.id, otherUserId].forEach(async (id) => {
                await db.insert(userToChat).values({
                    chatId: insertedChatId,
                    userId: id,
                    isGroupChat: isGroupChat,
                })
            });

            // pusher trigger
            const otherUser = await db.query.userSchema.findFirst({ where: eq(userSchema.id, otherUserId) });
            const newChat = await db.query.chatSchema.findFirst({ where: eq(chatSchema.id, insertedChatId), });

            await pusherServer.trigger(currentUser.email, "chat:create", { newChat });
            await pusherServer.trigger(otherUser!.email!, "chat:create", { newChat });

            return NextResponse.json({ success: true, message: "Chat created successfully.", chatId: insertedChatId }, { status: 201 });
        } else {
            return NextResponse.json({ success: true, message: "Chat already exists!", chatId: existing_chat.chat_id }, { status: 200 })
        }

    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: err.status || 500 });
    }
}