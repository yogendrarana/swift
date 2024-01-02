import { db } from "@/db/db"
import { and, eq, not } from "drizzle-orm"
import { NextResponse, NextRequest } from "next/server"

// import schemas
import { userToChat } from "@/db/drizzle/schema/userToChat.join"
import { UserType, userSchema } from "@/db/drizzle/schema/user.schema"


// GET: /api/profile/route.ts
export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const email = url.searchParams.get("email")

    try {
        if (email == null) {
            return NextResponse.json({ success: false, message: "Please provide email." }, { status: 400 });
        }

        // check if the user exists
        const userData = await db.select().from(userSchema).where(eq(userSchema.email, email));
        if (!userData.length) {
            return NextResponse.json({ success: false, message: `${email} is not registered.` }, { status: 400 });
        }

        // return success message
        return NextResponse.json({ success: true, message: 'User found.', user: userData[0] }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: err.status || 500 });
    }
}


// PATCH: /api/profile/route.ts
export async function PATCH(req: NextRequest) {
    const url = new URL(req.url)
    const email = url.searchParams.get("email")

    const body = await req.json();
    const { newName, newEmail } = body;

    try {
        if (email == null) {
            return NextResponse.json({ success: false, message: "Please provide email." }, { status: 400 });
        }

        // check if the user exists
        const userData = await db.select().from(userSchema).where(eq(userSchema.email, email));
        if (!userData.length) {
            return NextResponse.json({ success: false, message: `${email} is not registered.` }, { status: 400 });
        }

        // update the user
        const updateObject: Partial<UserType> = {};
        if (newName) updateObject.name = newName;
        if (newEmail) updateObject.email = newEmail;

        await db.update(userSchema).set(updateObject).where(eq(userSchema.email, email));

        // return success message
        return NextResponse.json({ success: true, message: 'Date updated successfully.' }, { status: 200 });

    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: err.status || 500 });
    }
}


// DELETE: /api/profile/route.ts
// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

//     try {
//         const userId = parseInt(params.id);

//         // delete only the user if the chat is group chat
//         // delete the user and other user if the chat is not group chat i.e. 1-1 chat
//         const userToChats = await db.select().from(userToChat).where(eq(userToChat.userId, userId));
//         for (const row of userToChats) {
//             if (userToChat.isGroupChat) {
//                 await db.delete(userToChat).where(eq(userToChat.id, row.id));
//             } else {
//                 const otherUserToChat = await db.select(userToChat).where(
//                     and(
//                         eq(userToChat.chatId, userToChat.chatId),
//                         not(eq(userToChat.userId, userId))
//                     )
//                 ).first();
//                 await db.delete(userToChat).where(eq(userToChat.id, row.id));
//                 await db.delete(userToChat).where(eq(userToChat.id, otherUserToChat.id));
//             }
//         }

//         // delete user
//         await db.delete(userSchema).where(eq(userSchema.id, userId));

//         // return success message
//         return NextResponse.json({ success: true, message: 'User deleted successfully.' }, { status: 200 });

//     } catch (err: any) {
//         return NextResponse.json({ success: false, message: err.message }, { status: err.status || 500 });
//     }
// }
