import React from 'react'

// import components
import ChatList from './components/ChatList';
import Sidebar from '@/components/chat/Sidebar'

// import actions
import getUserChats from '@/actions/getUserChats';
import { getAllUsers } from '@/actions/getAllUsers';
import getCurrentUser from '@/actions/getCurrentUser';

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