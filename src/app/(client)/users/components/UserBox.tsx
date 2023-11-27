"use client"


import axios from "axios"
import Image from "next/image"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import React, { useCallback, useState } from "react"


// temporary user profile pic
import userPic from '@/src/assets/images/user.jpg'


// import components
import DotWave from "@/src/components/loading/DotWave"


// import types
import { UserType } from "@/drizzle/schema/user.schema"
import Avatar from "@/src/components/avatar/Avatar"


// user box props
interface UserBoxProps {
    user: UserType
}


const UserBox: React.FC<UserBoxProps> = ({ user }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateChatOrNavigate = useCallback(async () => {
        setIsLoading(true);

        try {
            const { data, status } = await axios.post('/api/chats', { otherUserId: user.id, isGroupChat: false });

            if (status >= 300) throw new Error();
            if (status === 201 || status === 200) {
                router.push(`/chats/${data.chatId}`);
            }
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            if (err.response && err.response.data && err.response.data.message) {
                return toast.error(err.response.data.message);
            } else {
                return toast.error("An error occurred during registration.");
            }
        }
    }, [router, user]);

    if (isLoading) return <DotWave />

    return (
        <div
            onClick={handleCreateChatOrNavigate}
            className='
                flex
                cursor-pointer 
                group duration-200 
            '
        >
            <div className="mr-[1rem]">
                <Avatar height={45} width={45} user={user} />
            </div>

            <div className='flex flex-col justify-center flex-1'>
                <div className='flex justify-between'>
                    <div className='text-[1.25rem] font-bold capitalize'>{user.name}</div>
                </div>
            </div>
        </div>
    )
}

export default UserBox;