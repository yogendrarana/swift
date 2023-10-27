import bcrypt from 'bcrypt';
import { db } from '@/src/db/db';
import { eq } from 'drizzle-orm';
import NextAuth, { AuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import CredentialProvider from "next-auth/providers/credentials";
import { userSchema } from '../../../../../drizzle/schema/user.schema';


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

            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) throw new Error("Please, enter the required fields.");
                
                // find the user in the database
                const [user] = await db.select().from(userSchema).where(eq(userSchema.email, credentials.email));
                if (!user) throw new Error("Invalid credentials! Please, try again.");

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isCorrectPassword) throw new Error("Invalid credentials! Please, try again.");

                return user;
            }
        })
    ],

    pages: { signIn: "/join" },
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
}


// next auth handler NextAuth(authOptions)
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }