import React from 'react'

// import components
import ChatList from './components/ChatList';
import Sidebar from '@/src/components/chat/Sidebar'

const ChatsLayout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <Sidebar>
            <div className='h-full flex'>
                <div className='w-[var(--mini-sidebar-width)]'>
                    <ChatList />
                </div>
                <div className='flex-1'>
                    {children}
                </div>
            </div>
        </Sidebar>
    )
}

export default ChatsLayout;