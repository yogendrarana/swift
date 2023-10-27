import { db } from "@/src/db/db";
import { desc, ne } from "drizzle-orm";
import getAuthSession from "./getAuthSession";
import { userSchema } from "../../drizzle/schema/user.schema";


export const getAllUsers = async () => {
    const session = await getAuthSession();

    if(!session?.user?.email){
        return [];
    }

    try{
        const users = await 
        db.select()
        .from(userSchema)
        .where(ne(userSchema.email, session.user.email))
        .orderBy(desc(userSchema.createdAt));
        
        return users;
    }catch (err: any){
        console.log(err);
        return [];
    }
}

