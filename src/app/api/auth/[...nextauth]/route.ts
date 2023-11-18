import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '@/src/db/db';
import { eq } from 'drizzle-orm';
import NextAuth, { AuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { userSchema } from '@/drizzle/schema/user.schema';
import CredentialProvider from "next-auth/providers/credentials";


// next auth options
export const authOptions: AuthOptions = {
    adapter: DrizzleAdapter(db),

    providers: [
        CredentialProvider({
            name: "credentials",

            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) throw new Error("Please, enter the required fields.");

                    const [user] = await db.select().from(userSchema).where(eq(userSchema.email, credentials.email));
                    if (!user) throw new Error("Invalid credentials! Please, try again.");

                    const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isCorrectPassword) throw new Error("Invalid credentials! Please, try again.");

                    return user as any;

                } catch (err: any) {
                    console.error('Authorization error:', err.message);
                    return null;
                }
            }
        })
    ],

    callbacks: {
        // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
        jwt({ token, trigger, session }) {
            if (trigger === "update" && session?.email) {
                // Note, that `session` can be any arbitrary object, remember to validate it!
                token.email = session.email;
            }

            return token
        }

        // 
    },

    pages: { signIn: "/join" },
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
}


// next auth handler NextAuth(authOptions)
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }