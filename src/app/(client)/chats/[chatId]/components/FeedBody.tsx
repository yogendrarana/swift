"use client"

import { find } from 'lodash';
import React, { useEffect, useRef } from 'react'
import Pusher from 'pusher-js';

// import components
import Message from './Message';

// hooks
import useChat from '@/src/hooks/useChat';

// pusher
import { pusherClient } from '@/src/pusher/pusher';

// import types
import { FullMessageType } from '@/src/types/types';

type PropType = {
    initialMessages: FullMessageType[];
}

const FeedBody: React.FC<PropType> = ({ initialMessages = [] }) => {
    const { chatId } = useChat();
    const bottomRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = React.useState<FullMessageType[]>(initialMessages)

    
    useEffect(() => {
        const messageHandler = (message: FullMessageType) => {
            setMessages((currentMessages) => {
                if (find(currentMessages, { id: message.id })) {
                    return currentMessages
                }

                return [...currentMessages, message]
            })

            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }

        pusherClient.subscribe(chatId).bind('message:new', messageHandler)
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

        // clean up
        return () => {
            pusherClient.unsubscribe(chatId)
            pusherClient.unbind('message:new', messageHandler)
        }

    }, [chatId])

    if (messages.length === 0) {
        return (
            <div className='flex-1 grid place-content-center gap-[1rem] py-[1rem]'>
                <p className='text-[1.5rem] text-center text-gray-500'>No messages yet...</p>
            </div>
        )
    }

    return (
        <div className='flex-1 flex flex-col gap-[0.5rem] py-[1rem] overflow-y-auto'>
            {
                messages.map((message: FullMessageType) => (<Message key={message.id} message={message} />))
            }
        </div>
    )
}

export default FeedBody;