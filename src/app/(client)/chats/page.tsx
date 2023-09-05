import React from 'react'


// import actions
import getCurrentUser from '@/actions/getCurrentUser';


// import components
import ChatList from '@/components/chat/ChatList';
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"


const Chats = async () => {
    const currentUser = await getCurrentUser();

    return (
        <section className='h-full w-full px-[1.5rem] flex flex-col'>
            <div className='h-[7.5rem] flex items-center text-[2.5rem]'>
                <Avatar className='h-[3.5rem] w-[3.5rem]'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <p className='ml-[1rem] text-[1.5rem] capitalize'>{currentUser?.name}</p>
            </div>

            <ChatList />
        </section>
    )
}

export default Chats