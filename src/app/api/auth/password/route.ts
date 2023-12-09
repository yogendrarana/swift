import bcrypt from "bcrypt";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/db/drizzle/schema/user.schema";

export async function PUT(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url);
    const email = url.searchParams.get("email")

    const body = await req.json();
    const { oldPassword, newPassword } = body;

    try {
        if (email == null) {
            return NextResponse.json({ success: false, message: "Please provide email." }, { status: 400 });
        }

        // check if the user exists
        const user = await db.query.userSchema.findFirst({where: eq(userSchema.email, email)})
        if (!user) {
            return NextResponse.json({ success: false, message: `${email} is not registered.` }, { status: 400 });
        }


        // check if the passwords are empty or not
        if (!oldPassword || !newPassword) {
            return NextResponse.json({ success: false, message: "Please provide old and new password." }, { status: 400 });
        }

        // check if the old password is correct
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) return NextResponse.json({ success: false, message: "Old password is incorrect." }, { status: 400 });

        // hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // update the password
        await db.update(userSchema).set({ password: hashedPassword }).where(eq(userSchema.email, email));

        // return success message
        return NextResponse.json({ success: true, message: 'Password updated successfully.' }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: err.status || 500 });
    }
}