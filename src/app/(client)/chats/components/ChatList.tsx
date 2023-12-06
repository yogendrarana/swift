"use client"


import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { pusherClient } from '@/src/pusher/pusher';


// import components
import ChatBox from './ChatBox'
import CreateGroupChatDialog from '@/src/components/dialog/CreateGroupChatDialog';


// import hooks
import useChat from '@/src/hooks/useChat';


// import types
import { ChatType } from '@/drizzle/schema/chat.schema';
import { UserType } from '@/drizzle/schema/user.schema';


// define prop types
type PropType = {
    initialChatList: ChatType[],
    users: UserType[],
    currentUser: UserType | null
}


const ChatList: React.FC<PropType> = ({ initialChatList, users, currentUser }) => {
    const router = useRouter();
    const { isChatOpen } = useChat();

    // local state
    const [chatList, setChatList] = useState<ChatType[]>([]);

    useEffect(() => {
        if (initialChatList.length) {
            setChatList(initialChatList)
        }
    }, [initialChatList]);

    useEffect(() => {
        const newChatHandler = (data: any) => {
            const { newChat } = data;

            if (!chatList.length) {
                setChatList([newChat])
                return;
            }

            setChatList((prevChatList) => {
                return [newChat, ...prevChatList]
            })

        }

        const chatDeleteHandler = (data: any) => {
            setChatList((prevChatList) => {
                return [...prevChatList.filter((chat) => chat.id !== parseInt(data.chatId))]
            })

            router.push('/chats');
        }

        const newChatListHandler = (data: any) => {
            const { chatId } = data;

            if (chatList.length) {
                setChatList((prevChatList) => {

                    // put the chat with chatId to the top of the list
                    const chatIndex = prevChatList.findIndex((chat) => chat.id === parseInt(chatId));
                    const removedChat = prevChatList.splice(chatIndex, 1)[0];
                    prevChatList.unshift(removedChat);
                    return [...prevChatList];
                })
            }
        }

        if (currentUser?.email) {
            pusherClient.subscribe(currentUser?.email)

            // bind event
            pusherClient.bind("chat:create", newChatHandler)
            pusherClient.bind("chat:delete", chatDeleteHandler)
            pusherClient.bind("chat-list:update", newChatListHandler)
        }

        return () => {
            pusherClient.unsubscribe(currentUser?.email!);

            // unbind event
            pusherClient.unbind("chat:create", newChatHandler)
            pusherClient.unbind("chat:delete", chatDeleteHandler)
            pusherClient.unbind("chat-list:update", newChatListHandler)
        }
    }, [currentUser?.email, chatList, router])

    return (
        <div
            className={`
                h-full w-[var(--mini-sidebar-width)] p-[1rem] 
                bg-white
                flex flex-col
                overflow-y-auto
                md:fixed
                md:w-full
                md:inset-y-0 
                md:z-[10]
                ${isChatOpen ? 'md:hidden' : ''}
            `}
        >
            <div className='h-[4rem] flex justify-between items-center text-[2rem] font-bold' >
                <span>Chats</span>
                <CreateGroupChatDialog users={users} />
            </div>

            <hr className='my-[1rem]' />

            <ul
                className='
                    overflow-y-auto 
                    flex flex-col gap-[1rem] 
                '
            >
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