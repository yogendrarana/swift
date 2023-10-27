import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";


export default async function getAuthSession () {
    return await getServerSession(authOptions);
}