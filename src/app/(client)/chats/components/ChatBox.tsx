"use client"

import axios from 'axios'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/pusher/pusher'
import React, { useEffect, useState } from 'react'


// components
import Link from 'next/link'
import Avatar from '@/components/avatar/Avatar'


// types
import { ChatType } from '@/db/drizzle/schema/chat.schema'
import { UserType } from '@/db/drizzle/schema/user.schema'

// prop types
interface ChatBoxProps {
    chat: ChatType,
    currentUser: UserType | null
}


const ChatBox: React.FC<ChatBoxProps> = ({ chat, currentUser }) => {
    const session = useSession();
    const email = session?.data?.user?.email;

    const [lastMessage, setLastMessage] = useState<any>(null);
    const [otherUser, setOtherUser] = useState<UserType | null>(null);
    const [lastMessageText, setLastMessageText] = useState<string>('');

    useEffect(() => {
        async function getOtherUserOfChat() {
            const { data } = await axios.get(`/api/chats/other-user?chatId=${chat?.id}`);
            setOtherUser(data?.user);
        }

        async function getLastMessageOfChat() {
            const { data } = await axios.get(`/api/chats/last-message?chatId=${chat?.id}`);
            setLastMessage(data?.message);
        }

        getLastMessageOfChat();
        getOtherUserOfChat();
    }, [chat?.id])


    // for pusher subscription
    useEffect(() => {
        const newMessageHandler = (data: any) => {
            if (chat?.id === data?.newMessage?.chatId) {
                setLastMessage(data.newMessage);
            }
        }

        if (email) {
            pusherClient.subscribe(email)
        }

        pusherClient.bind("message:create", newMessageHandler)

        // clean up
        return () => {
            pusherClient.unsubscribe(email!)
            pusherClient.unbind("message:create", newMessageHandler)
        }
    }, [email, chat?.id]);

    // for last message text
    useEffect(() => {
        const getLastMessageText = () => {
            if (lastMessage && lastMessage?.text !== null && lastMessage?.image === null) {
                if (lastMessage?.senderId === currentUser?.id) {
                    return lastMessage.text.length < 15 ? `You: ${lastMessage.text}` : `You: ${lastMessage.text.slice(0, 15)}` + '...';
                } else {
                    return lastMessage.text.length < 15 ? lastMessage.text : lastMessage.text.slice(0, 15) + '...';
                }
            } else if (lastMessage?.image !== null && lastMessage?.text === null) {
                if (lastMessage?.senderId === currentUser?.id) {
                    return 'You sent a photo';
                } else {
                    return 'Sent a photo';
                }
            } else {
                return 'No messages yet.';
            }
        }

        setLastMessageText(getLastMessageText());
    }, [lastMessage, currentUser?.id])


    return (
        <div
            className='
                group 
                duration-200 
            '
        >
            <Link href={`/chats/${chat?.id}`} className='flex'>
                <div className='mr-[1rem]'>
                    <Avatar height={45} width={45} user={otherUser} />
                </div>

                <div className='flex flex-col justify-center flex-1'>
                    <div className='flex justify-between items-center'>
                        <div className='text-[1.25rem] font-bold capitalize'>{chat?.name || otherUser?.name}</div>
                    </div>

                    <div className='flex justify-between items-center'>
                        <p className='text-gray-400 text-[1.25rem]'>
                            {lastMessageText}
                        </p>
                        <div className='text-gray-400 text-[1.25rem]'>
                            {
                                lastMessage?.createdAt && moment(new Date(lastMessage.createdAt)).format('h:mm A')
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ChatBox;