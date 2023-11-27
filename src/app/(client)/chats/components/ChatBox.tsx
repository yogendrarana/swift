"use client"

import axios from 'axios'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/src/pusher/pusher'
import React, { useEffect, useState } from 'react'


// components
import Link from 'next/link'


// types
import { ChatType } from '@/drizzle/schema/chat.schema'
import { UserType } from '@/drizzle/schema/user.schema'
import Avatar from '@/src/components/avatar/Avatar'

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
            const res = await axios.get(`/api/chats/other-user?chatId=${chat?.id}`);
            setOtherUser(res.data.user);
        }

        async function getLastMessageOfChat() {
            const res = await axios.get(`/api/chats/last-message?chatId=${chat?.id}`);
            setLastMessage(res.data.message);
        }

        getLastMessageOfChat()
        getOtherUserOfChat();
    }, [chat?.id])
    

    // for pusher subscription
    useEffect(() => {
        const newMessageHandler = (data: any) => {
            if (chat?.id === data?.newMessage?.chatId){
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
        const getLastMessage = () => {
            if (lastMessage?.text !== null && lastMessage?.image === null) {
                if (lastMessage?.senderId === currentUser?.id) {
                    return lastMessage.text.length < 15 ? `You: ${lastMessage.text}`  : `You: ${lastMessage.text.slice(0, 15)}` + '...'; 
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

        setLastMessageText(getLastMessage());
    }, [lastMessage, currentUser?.id])


    return (
        <div className='group duration-200 pr-[1rem] mb-[1rem] last-child:mb-0 last:mb-0'>
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
                                lastMessage?.createdAt && format(new Date(lastMessage.createdAt), 'h:mm a')
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ChatBox;