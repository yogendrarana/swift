import React from 'react'

// import components
import ChatBox from './ChatBox'
import CreateGroupChatDialog from '@/src/components/dialog/CreateGroupChatDialog';

// import actions
import getUserChats from '@/src/actions/getUserChats'

// import types
import { ChatType } from '@/drizzle/schema/chat.schema';
import { getAllUsers } from '@/src/actions/getAllUsers';

const ChatList = async () => {
    const chat_list = await getUserChats();
    const users = await getAllUsers();

    return (
        <div className='h-full w-full p-[1rem] flex flex-col overflow-y-auto'>
            <div className='h-[4rem] flex justify-between items-center text-[2rem] font-bold' >
                <span>Chats</span>
                <CreateGroupChatDialog users={users} />
            </div>

            <hr className='my-[1rem]' />

            <input
                type="text"
                placeholder='Search by name...'
                autoComplete='off'
                className='
                    mb-[2rem] p-[1rem] 
                    border-none
                    outline-none 
                    bg-gray-100
                    rounded-[0.5rem]
                    text-[1.25rem]
                    placeholder:text-[1.25rem]
                '
            />

            <ul className='overflow-y-auto'>
                {
                    !chat_list.length ? (
                        <span className='text-[1.25rem] text-gray-600'>
                            No conversation yet. <br />
                            Please browse the user to stat conversation.
                        </span>
                    ) : (
                        chat_list.map((chat: ChatType, index: number) => (
                            <ChatBox key={index} chat={chat} />
                        ))
                    )
                }
            </ul>
        </div>
    )
}

export default ChatList;