import React from 'react'

// import components
import Message from './Message';

// import types
import { FullMessageType } from '@/src/types/types';


type PropType = {
    messages: FullMessageType[];
}

const FeedBody: React.FC<PropType> = async ({ messages }) => {
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