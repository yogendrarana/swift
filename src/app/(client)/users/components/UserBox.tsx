"use client"


import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import React, { useCallback, useState } from "react"


// temporary user profile pic
import userPic from '@/src/assets/images/user.jpg'
import { UserType } from "@/drizzle/schema/user.schema"


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
            if (data.success && status === 201) toast.success(data.message);

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


    return (
        <div
            className='group duration-200 pr-[1rem] mb-[2rem] last-child:mb-0 last:mb-0'
            onClick={handleCreateChatOrNavigate}
        >
            <div className='flex'>
                <div className='h-[4rem] w-[4rem] mr-[1rem] grid place-items-center border-[0.25rem] border-gray-100 group-hover:border-gray-300 relative rounded-full duration-150'>
                    <Image
                        height={30}
                        width={30}
                        src={userPic}
                        alt='user profile pic'
                        className='rounded-full'
                    />
                    <span 
                        className='
                            absolute 
                            h-[1.25rem] w-[1.25rem] 
                            right-[-0.2rem] bottom-[-0.2rem] 
                            border-[0.25rem] border-white 
                            rounded-full 
                            bg-[var(--primary-green)]
                        '
                    ></span>
                </div>

                <div className='flex flex-col justify-center flex-1'>
                    <div className='flex justify-between'>
                        <div className='text-[1.25rem] font-bold capitalize'>{user.name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBox;