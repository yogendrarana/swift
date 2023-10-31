import React from 'react'
import Image from 'next/image';
import { format } from 'date-fns';

// import types
import { FullMessageType } from '@/src/types/types';

// import actions
import getAuthSession from '@/src/actions/getAuthSession';

// define prop types
type PropType = {
    message: FullMessageType;
}

const Message: React.FC<PropType> = async ({ message }) => {
    const session = await getAuthSession();
    const isMyMessage = message.sender.email === session?.user?.email;

    return (
        <div className='w-full flex flex-col'>
            <div
                className={`
                    w-[45%]
                    p-[1rem] 
                    text-[1.25rem] 
                    bg-gray-200
                    rounded-[1rem]
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