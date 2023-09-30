import React from 'react'


// import components
import ChatList from '@/components/chat/ChatList';


const Chats = async () => {

    return (
        <section className='max-h-[100vh] w-full p-[1rem] flex flex-col overflow-hidden'>
            <div className='flex items-center text-[2rem]'>Chats</div>

            <hr className='my-[1rem]' />

            <ChatList />
        </section>
    )
}

export default Chats