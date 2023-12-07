import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';

// import image
import Chat from '@/src/assets/images/chat.png'
import ChatBox from '@/src/assets/images/chat-box.png'
import LiveChat from '@/src/assets/images/live-chat.png'
import Conversation from '@/src/assets/images/conversation.png'

const Features = () => {
    return (
        <div className="my-[5rem] grid grid-cols-2 gap-[2rem] sm:gap-[1rem] md:grid-cols-1">
            {/* feature 1 */}
            <div className='p-[5rem] flex flex-col gap-[1rem] items-center justify-center rounded-[1rem] bg-gray-100'>
                <Image src={LiveChat} alt='' height={60} width={60} />
                <motion.h2 
                    className='text-[3rem] text-center'
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }} 
                    transition={{ duration: 0.3 }}
                >
                    Real time chat
                </motion.h2>
                <motion.p 
                    className='text-[1.75rem] text-center'
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }} 
                    transition={{ duration: 0.5 }}
                >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </motion.p>
            </div>


            {/* feature 2 */}
            <div className='p-[5rem] flex flex-col gap-[1rem] items-center justify-center rounded-[1rem] bg-gray-100'>
                <Image src={ChatBox} alt='' height={60} width={60} />
                <motion.h2 
                    className='text-[3rem] text-center'
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }} 
                    transition={{ duration: 0.3 }}
                >
                    Group chat
                </motion.h2>
                <motion.p 
                    className='text-[1.75rem] text-center'
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }} 
                    transition={{ duration: 0.5 }}
                >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </motion.p>
            </div>


            {/* feature 3 */}
            <div className='p-[5rem] flex flex-col gap-[1rem] items-center justify-center rounded-[1rem] bg-gray-100'>
                <Image src={Chat} alt='' height={60} width={60} />
                <motion.h2 
                    className='text-[3rem] text-center'
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }} 
                    transition={{ duration: 0.3 }}
                >
                    Responsive
                </motion.h2>
                <motion.p 
                    className='text-[1.75rem] text-center'
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }} 
                    transition={{ duration: 0.5 }}
                >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </motion.p>
            </div>


            {/* feature 4 */}
            <div className='p-[5rem] flex flex-col gap-[1rem] items-center justify-center rounded-[1rem] bg-gray-100'>
                <Image src={Conversation} alt='' height={60} width={60} />
                <motion.h2 
                    className='text-[3rem] text-center'
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }} 
                    transition={{ duration: 0.3 }}
                >
                    Chat anytime
                </motion.h2>
                <motion.p 
                    className='text-[1.75rem] text-center'
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }} 
                    transition={{ duration: 0.5 }}
                >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </motion.p>
            </div>
            
        </div>
    )
}

export default Features;