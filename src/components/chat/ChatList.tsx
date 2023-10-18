import React from 'react'
import Link from 'next/link'

const ChatList = () => {
    return (
        <div className='h-full w-full flex flex-col overflow-y-auto'>
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
                    [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                        <li key={index} className='group duration-200 pr-[1rem] mb-[2rem] last-child:mb-0 last:mb-0'>
                            <Link href="#" className='flex'>
                                <div className='h-[4rem] w-[4rem] mr-[1rem] grid place-items-center border-[0.25rem] border-gray-100 group-hover:border-gray-300 relative rounded-full duration-150'>
                                    <span>JD</span>
                                    <span className='absolute h-[1.25rem] w-[1.25rem] right-[-0.2rem] bottom-[-0.2rem] border-[0.25rem] border-white rounded-full bg-[var(--primary-green)]'></span>
                                </div>

                                <div className='flex flex-col justify-center flex-1'>
                                    <div className='flex justify-between'>
                                        <div className='text-[1.25rem] font-bold'>John Doe</div>
                                        <div className='text-gray-400'>4:00 AM</div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-gray-500'>This is the messages sent...</p>
                                        <div className='h-[0.75rem] w-[0.75rem] rounded-full bg-[var(--primary-blue)]'></div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ChatList;