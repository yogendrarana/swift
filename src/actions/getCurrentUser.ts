import { db } from '@/db/db';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { userSchema } from '../../drizzle/schema/user.schema';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


const getCurrentUser = async () => {
    try{
        const session = await getServerSession(authOptions);

        if(!session?.user?.email){
            return null;
        }

        const [currentUser] = await db.select().from(userSchema).where(eq(userSchema.email, session.user.email));

        if(!currentUser) {
            return null;
        }

        return currentUser;
    }catch (err: any){
        console.log(err);
        return null;
    }
}


export default getCurrentUser;