import React from 'react'

// import components
import ChatList from './components/ChatList';
import Sidebar from '@/src/components/chat/Sidebar'

// import actions
import getUserChats from '@/src/actions/getUserChats';
import { getAllUsers } from '@/src/actions/getAllUsers';
import getCurrentUser from '@/src/actions/getCurrentUser';

const ChatsLayout = async ({ children }: { children: React.ReactNode }) => {
    const users = await getAllUsers();
    const chatList = await getUserChats();
    const currentUser = await getCurrentUser()

    return (
        <Sidebar>
            <div className='h-full flex'>
                <ChatList initialChatList={chatList} users={users} currentUser={currentUser} />
                
                <div className='flex-1'>
                    {children}
                </div>
            </div>
        </Sidebar>
    )
}

export default ChatsLayout;