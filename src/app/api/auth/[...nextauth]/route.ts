import NextAuth from "next-auth/next";
import { authOptions } from "@/utils/authOptions";


// next auth handler NextAuth(authOptions)
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }