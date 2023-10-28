import Image from 'next/image'
import React, { useMemo } from 'react'

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


// import image
import ProfileImage from "@/src/assets/images/user.jpg"

const FeedHeader: React.FC<PropType> = ({ chat }) => {
    const otherUser = getOtherUserOfChat(chat!.id); //chat not null or undefined assertion

    const statusText = useMemo(() => {
        if (chat?.isGroupChat) {
            const count = chat.members.length;
            return `${count} ${count === 1 ? 'member' : 'members'}`;
        }

        return "Active"
    }, [chat?.isGroupChat, chat?.members.length])

    return (
        <div className=' h-[6rem]' >  {/* 6 rem height because the ChatList and other has py also */}
            Header
        </div>
    )
}

export default FeedHeader;