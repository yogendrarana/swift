import { db } from "@/db/db";
import { ne } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { userSchema } from "../../drizzle/schema/user.schema";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getOtherUsers = async () => {
    const session = await getServerSession(authOptions);

    if(!session?.user?.email){
        return [];
    }

    try{
        const users = await db.select().from(userSchema).where(ne(userSchema.email, session.user.email));
        return users;
    }catch (err: any){
        console.log(err);
        return [];
    }
}


export default getOtherUsers;