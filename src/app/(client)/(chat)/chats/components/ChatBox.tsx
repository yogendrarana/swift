import React from 'react'
import moment from 'moment'


// components
import Link from 'next/link'


// types
import { ChatType } from '@/drizzle/schema/chat.schema'
interface ChatBoxProps {
    chat: ChatType
}


const ChatBox: React.FC<ChatBoxProps> = ({chat}) => {
    return (
        <div className='group duration-200 pr-[1rem] mb-[2rem] last-child:mb-0 last:mb-0'>
            <Link href={`/chats/${chat.id}`} className='flex'>
                <div className='h-[4rem] w-[4rem] mr-[1rem] grid place-items-center border-[0.25rem] border-gray-100 group-hover:border-gray-300 relative rounded-full duration-150'>
                    <span>JD</span>
                    <span className='absolute h-[1.25rem] w-[1.25rem] right-[-0.2rem] bottom-[-0.2rem] border-[0.25rem] border-white rounded-full bg-[var(--main-green)]'></span>
                </div>

                <div className='flex flex-col justify-center flex-1'>
                    <div className='flex justify-between'>
                        <div className='text-[1.25rem] font-bold'>
                            John Doe
                        </div>
                        <div className='text-gray-400'>
                            4:00 PM
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-gray-500'>This is the messages sent...</p>
                        <div className='h-[0.75rem] w-[0.75rem] rounded-full bg-[var(--primary-blue)]'></div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ChatBox