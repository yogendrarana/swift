import React from 'react'
import Image from 'next/image';
import { format } from 'date-fns';

// import types
import { MessageType } from '@/drizzle/schema/message.schema';

// define prop types
type PropType = {
    message: MessageType;
    isMyMessage: boolean;
}

const Message: React.FC<PropType> = ({ message, isMyMessage }) => {

    return (
        <div className='w-full flex flex-col'>
            <div
                className={`
                    p-[1rem] w-[45%]
                    text-[1.25rem] 
                    bg-gray-100 
                    rounded-[0.5rem]
                    ${isMyMessage ? 'ml-auto' : 'mr-auto'}
                `}
            >
                <p className='mb-[0.25rem] text-[1rem] text-gray-500'>{format(new Date(message.createdAt), 'h:mm a')}</p>

                {
                    message.text !== null ? (
                        <p> {message.text} </p>
                    ) : (
                        <Image
                            src={message.image || 'No link'}
                            alt="image-msg"
                            height={200}
                            width={200}
                            className='object-cover rounded-[0.5rem]'
                        />
                    )
                }
            </div>

        </div>
    )
}

export default Message;