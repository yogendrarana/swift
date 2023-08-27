"use client"

import ChatList from '@/components/chat/ChatList';
import { useSession } from 'next-auth/react';
import React from 'react'

const Chats = () => { 
    const session = useSession();

    return (
        <section>
            <ChatList />            
        </section>
    )
}

export default Chats