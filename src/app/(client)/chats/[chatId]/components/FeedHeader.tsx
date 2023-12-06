"use client"

import React from 'react'
import toast from 'react-hot-toast'


// import components
import Avatar from '@/src/components/avatar/Avatar'
import ChatDetailSheet from '@/src/components/sheet/ChatDetailSheet'


// import types
import { FullChatType } from '@/src/types/types'


// import hooks
import useOtherUser from '@/src/hooks/useOtherUser'
import useActiveUsers from '@/src/hooks/useActiveUsers'


// prop type
type PropType = {
    chat: FullChatType | null | undefined;
}


const FeedHeader: React.FC<PropType> = ({ chat }) => {
    
    const otherUser = useOtherUser(chat);

    const { members } = useActiveUsers();

    const getStatusText = () => {
        if (chat?.isGroupChat) {
            const count = chat.members.length;
            return `${count} ${count === 1 ? 'member' : 'members'}`;
        }

        const isActive = members.indexOf(otherUser?.user?.email!) !== -1;

        if (isActive) {
            return 'Online';
        }

        return 'Offline';
    }

    return (
        <>
            <div className='h-[6rem] border-b flex justify-between items-center gap-[1rem]' >  {/* 6 rem height because the ChatList and other has py also */}
                <button 
                    onClick={() => history.back()}
                    className='h-[4rem] w-[4rem] text-[1.25rem] rounded-full hidden md:flex items-center justify-center hover:bg-gray-200 duration-200'
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                
                <Avatar height={40} width={40} user={otherUser?.user!} />

                <div className='mr-auto'>
                    <p className='text-[1.45rem]'>{chat && chat.name || otherUser?.user.name}</p>
                    <p className='text-[1.25rem] text-gray-500'>{getStatusText()}</p>
                </div>

                <div className='flex gap-[0.5rem]'>
                    <button onClick={() => toast("To be added later")} className='text-[1.25rem] h-[3.5rem] w-[3.5rem] hover:bg-gray-200 rounded-full duration-200'>
                        <i className="fa-solid fa-phone"></i>
                    </button>

                    <button onClick={() => toast("To be added later")} className='text-[1.25rem] h-[3.5rem] w-[3.5rem] hover:bg-gray-200 rounded-full duration-200'>
                        <i className="fa-solid fa-video"></i>
                    </button>

                    <ChatDetailSheet statusText={getStatusText()} chat={chat} />
                </div>
            </div>
        </>
    )
}

export default FeedHeader;