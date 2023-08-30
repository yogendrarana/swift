import React from 'react'


// import icons
import { ChevronDown } from 'lucide-react';

// import actions
import getCurrentUser from '@/actions/getCurrentUser';

// import components
import { Button } from '@/components/ui/button';
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

                <p className='ml-[1rem] text-[1.5rem]'>{currentUser?.name}</p>

                <Button variant="outline" size="icon" className='ml-auto border-0 rounded-full'>
                    <ChevronDown className="h-[1.75rem] w-[1.75rem]" />
                </Button>
            </div>

            <ChatList />
        </section>
    )
}

export default Chats