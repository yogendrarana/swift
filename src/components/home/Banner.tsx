import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'

// import image
import Chat from '@/src/assets/images/chat.png'
import ChatBox from '@/src/assets/images/chat-box.png'

const Banner = () => {
    return (
        <div className='relative'>
            <div
                className='
                        h-[calc(100vh-var(--nav-height))] 
                        flex flex-col gap-[2.5rem]
                        justify-center items-center
                    '
            >
                <p
                    className='text-[10rem] leading-none text-center font-bold md:text-[5rem]'
                    style={{
                        background: 'linear-gradient(to right, var(--main-blue), var(--main-green))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Bringing your <br /> conversations to life
                </p>
                <p className='my-[3rem] text-[2rem] text-center'>A simple app that lets you text, <br /> video call (not really), and stay close to people you care about. </p>
                <Button className='w-[20rem] px-[1.75rem] py-[2.5rem] text-[1.5rem] text-black hover:bg-[var(--main-blue)] rounded-[5rem] bg-[var(--main-green)]'>Download For Mobile</Button>
            </div>

            {/* absolute */}
            <Image
                src={Chat}
                height={50}
                width={50}
                alt="chat icon"
                className="absolute bottom-[20rem] left-[15%] -rotate-12"
            />
            <Image
                src={ChatBox}
                height={50}
                width={50}
                alt="chat icon"
                className="absolute bottom-[20rem] right-[15%] rotate-12"
            />
        </div>
    )
}

export default Banner;