import React from 'react'

// import components
import Message from './Message';

// import actions
import getAuthSession from '@/src/actions/getAuthSession';

// import types
import { UserType } from '@/drizzle/schema/user.schema';
import { MessageType } from '@/drizzle/schema/message.schema';

// define types
type FullMessageType = MessageType & {
    sender: UserType
}

type PropType = {
    messages: FullMessageType[];
}

const FeedBody: React.FC<PropType> = async ({ messages }) => {
    const session = await getAuthSession();

    return (
        <div className='flex-1 flex flex-col gap-[1rem] py-[1rem]'>
            {
                messages.map((message: FullMessageType) => {
                    const isMyMessage = message.sender.email === session?.user?.email;
                    
                    return (
                        <Message key={message.id} isMyMessage={isMyMessage} message={message} />
                    )
                })
            }
        </div>
    )
}

export default FeedBody;