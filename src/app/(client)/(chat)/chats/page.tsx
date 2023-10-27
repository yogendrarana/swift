"use client"

import React from 'react'

// import components
import Empty from '@/src/components/util/Empty'

// import hooks
import useChat from '@/src/hooks/useChat'

const ChatsPage = () => {
    const { isChatOpen } = useChat();

    return (
        <div className={`
            h-full
            flex-1
            ${isChatOpen ? 'hidden' : 'block'}
        `}>
            <Empty />
        </div>
    )
}

export default ChatsPage;