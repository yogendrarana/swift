import React from 'react'

// import components
import Sidebar from '@/src/components/chat/Sidebar'
import ChatList from './components/ChatList';

const ChatsLayout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <Sidebar>
            <div className='h-full flex'>
                <div className='w-[var(--mini-sidebar-width)] '>
                    <ChatList />
                </div>
                {children}
            </div>
        </Sidebar>
    )
}

export default ChatsLayout;