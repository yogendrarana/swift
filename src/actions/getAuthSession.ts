import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";


export default async function getAuthSession () {
    return await getServerSession(authOptions);
}