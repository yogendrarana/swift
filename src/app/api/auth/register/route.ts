import bcrypt from "bcrypt"
import { db } from "@/src/db/db";
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/drizzle/schema/user.schema"


export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, email, password, avatar } = body;


    // check if all the fields are filled
    if (!name || !email || !password) {
        return NextResponse.json({ success: false, message: "Please fill all the fields." }, { status: 400 });
    }

    try {
        // check if user already exists
        const userData = await db.select().from(userSchema).where(eq(userSchema.email, email));
        if (userData.length) {
            return NextResponse.json({ success: false, message: `${email} is already used.` }, { status: 400 });
        }

        // hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // insert into user table
        const [newUser] = await db.insert(userSchema).values({ name, email, password: passwordHash, avatar });
        const insertId = newUser.insertId;

        // return success message
        return NextResponse.json({ success: true, message: 'User registered successfully.', userId: insertId }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: err.status || 500 });
    }
}