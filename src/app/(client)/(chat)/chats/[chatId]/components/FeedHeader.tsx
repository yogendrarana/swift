import Image from 'next/image'
import React, { useMemo } from 'react'

// import components
import Avatar from '@/src/components/avatar/Avatar'

// import types
import { ChatType } from '@/drizzle/schema/chat.schema'
import { UserType } from '@/drizzle/schema/user.schema'

// import actions
import getOtherUserOfChat from '@/src/actions/getOtherUserOfChat'

// define types
type FullChatType = ChatType & {
    admin: UserType | null,
    members: { user: UserType }[]
}

type PropType = {
    chat: FullChatType | null | undefined;
}


const FeedHeader: React.FC<PropType> = async ({ chat }) => {
    const otherUser = await getOtherUserOfChat(chat!.id); //chat not null or undefined assertion

    const getStatusText = () => {
        if (chat?.isGroupChat) {
            const count = chat.members.length;
            return `${count} ${count === 1 ? 'member' : 'members'}`;
        }

        return "Online"
    }

    return (
        <div className=' h-[6rem] border-b flex justify-between items-center gap-[1rem]' >  {/* 6 rem height because the ChatList and other has py also */}
            <Avatar h={50} w={50} />

            <div className='mr-auto'>
                <p className='text-[1.45rem]'>{otherUser !== null ? otherUser.name : "Loading..."}</p>
                <p className='text-[1.25rem] text-gray-500'>{getStatusText()}</p>
            </div>

            <div className='flex gap-[0.5rem]'>
                <button className='text-[1.25rem] h-[3.5rem] w-[3.5rem] hover:bg-gray-200 rounded-full duration-200'>
                    <i className="fa-solid fa-phone"></i>
                </button>

                <button className='text-[1.25rem] h-[3.5rem] w-[3.5rem] hover:bg-gray-200 rounded-full duration-200'>
                    <i className="fa-solid fa-video"></i>
                </button>

                <button className='text-[1.25rem] h-[3.5rem] w-[3.5rem] hover:bg-gray-200 rounded-full duration-200'>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
        </div>
    )
}

export default FeedHeader;