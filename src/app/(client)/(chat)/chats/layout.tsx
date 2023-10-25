import React from 'react'

// import components
import Sidebar from '@/components/chat/Sidebar'
import ChatList from './components/ChatList';

const ChatsLayout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <Sidebar>
            <div className='h-full flex'>
                <ChatList />
                {children}
            </div>
        </Sidebar>
    )
}

export default ChatsLayout;