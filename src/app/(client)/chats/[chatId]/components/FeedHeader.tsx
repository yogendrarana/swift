"use client"

import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/src/components/ui/sheet'

// import components
import Avatar from '@/src/components/avatar/Avatar'

// import types
import { FullChatType } from '@/src/types/types'

// import hooks
import useOtherUser from '@/src/hooks/useOtherUser'
import { Button } from '@/src/components/ui/button'
import { format } from 'date-fns'
import toast from 'react-hot-toast'


// prop type
type PropType = {
    chat: FullChatType | null | undefined;
}


const FeedHeader: React.FC<PropType> = ({ chat }) => {

    const otherUser = useOtherUser(chat);

    const getStatusText = () => {
        if (chat?.isGroupChat) {
            const count = chat.members.length;
            return `${count} ${count === 1 ? 'member' : 'members'}`;
        }

        return "Online"
    }

    const handleChatDelete = () => {
        toast.success("Chat deletion to be added later");
    }

    return (
        <>
            <div className='h-[6rem] border-b flex justify-between items-center gap-[1rem]' >  {/* 6 rem height because the ChatList and other has py also */}
                <Avatar height={50} width={50} />

                <div className='mr-auto'>
                    <p className='text-[1.45rem]'>{otherUser !== null ? otherUser.user.name : "Loading..."}</p>
                    <p className='text-[1.25rem] text-gray-500'>{getStatusText()}</p>
                </div>

                <div className='flex gap-[0.5rem]'>
                    <button className='text-[1.25rem] h-[3.5rem] w-[3.5rem] hover:bg-gray-200 rounded-full duration-200'>
                        <i className="fa-solid fa-phone"></i>
                    </button>

                    <button className='text-[1.25rem] h-[3.5rem] w-[3.5rem] hover:bg-gray-200 rounded-full duration-200'>
                        <i className="fa-solid fa-video"></i>
                    </button>

                    <Sheet>
                        <SheetTrigger className='text-[1.25rem] h-[3.5rem] w-[3.5rem] hover:bg-gray-200 rounded-full duration-200'>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </SheetTrigger>
                        <SheetContent side="right" className='py-[5rem] flex flex-col gap-[2rem]'>
                            <div className='flex gap-[0.5rem] flex-col items-center'>
                                <Avatar height={50} width={50} />
                                <p className='text-[1.25rem] text-gray-500'>{getStatusText()}</p>
                            </div>

                            <div className="flex flex-col gap-[0.5rem]">
                                <h2 className="text-[1.5rem] font-bold"> Email </h2>
                                <div className="p-[0.5rem] border rounded-[0.5rem] text-[1.25rem] text-gray-500">
                                    {otherUser && otherUser?.user.email}
                                </div>
                            </div>

                            <div className="flex flex-col gap-[0.5rem]">
                                <h2 className="text-[1.5rem] font-bold"> Joined Chat </h2>
                                <div className="p-[0.5rem] border rounded-[0.5rem] text-[1.25rem] text-gray-500">
                                    {chat && format(new Date(chat.createdAt), 'h:mm a')}
                                </div>
                            </div>

                            <div className="flex flex-col gap-[0.5rem]">
                                <h2 className="text-[1.5rem] font-bold"> Delete Chat ? </h2>
                                <button onClick={handleChatDelete} className="p-[0.5rem] text-red-500 border rounded-[0.5rem] text-[1.25rem]">
                                    <i className="fa-solid fa-trash"></i> 
                                    <span className='ml-[0.75rem]'>Delete</span>
                                </button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div >
        </>
    )
}

export default FeedHeader;