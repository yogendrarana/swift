"use client"

import React, { useEffect, useState } from 'react'

// import components
import ChatBox from './ChatBox'
import CreateGroupChatDialog from '@/src/components/dialog/CreateGroupChatDialog';

// import types
import { ChatType } from '@/drizzle/schema/chat.schema';
import { UserType } from '@/drizzle/schema/user.schema';
import { pusherClient } from '@/src/pusher/pusher';

type PropType = {
    initialChatList: ChatType[],
    users: UserType[],
    currentUser: UserType | null
}

const ChatList: React.FC<PropType> = ({ initialChatList, users, currentUser }) => {
    const [chatList, setChatList] = useState<ChatType[]>([]);

    useEffect(() => {
        if (initialChatList.length) {
            setChatList(initialChatList)
        }
    }, [initialChatList]);

    useEffect(() => {
        const newChatListOrderHandler = (data: any) => {
            const chatId = data.chatId;
            setChatList((prevChatList) => {
                // put the chat with chatId to the top of the list
                const chatIndex = prevChatList.findIndex((chat) => chat.id === parseInt(chatId));
                const chat = prevChatList[chatIndex];
                prevChatList.splice(chatIndex, 1);
                prevChatList.unshift(chat);
                return [...prevChatList];
            })
        }

        const chatDeleteHandler = (data: any) => {
            setChatList((prevChatList) => {
                return [...prevChatList.filter((chat) => chat.id !== parseInt(data.chatId))]
            })
        }

        if (currentUser?.email) {
            pusherClient.subscribe(currentUser?.email)

            // bind event
            pusherClient.bind("chat-list-order:update", newChatListOrderHandler)
            pusherClient.bind("chat:delete", chatDeleteHandler)
        }

        return () => {
            pusherClient.unsubscribe(currentUser?.email!);
            pusherClient.unbind("chat-list-order:update", newChatListOrderHandler)
            pusherClient.unbind("chat:delete", chatDeleteHandler)
        }
    }, [currentUser?.email, chatList])

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
                    !chatList.length ? (
                        <span className='text-[1.25rem] text-gray-600'>
                            No conversation yet.
                            <br />
                            Please browse the user to stat conversation.
                        </span>
                    ) : (
                        chatList.map((chat: ChatType, index: number) => (
                            <ChatBox key={index} chat={chat} currentUser={currentUser} />
                        ))
                    )
                }
            </ul>
        </div>
    )
}

export default ChatList;