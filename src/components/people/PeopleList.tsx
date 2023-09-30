import React from 'react'
import Link from 'next/link'
import Image from 'next/image';

// import hooks and actions
import getPeople from '@/actions/getPeople'

// import assets
import userPic from '@/assets/images/user.jpg'

const PeopleList = async () => {
    const people = await getPeople();

    return (
        <div className='h-full w-full flex flex-col'>
            <input
                type="text" 
                placeholder='Search by name...' 
                autoComplete='off' 
                className='border-none p-[1rem] mb-[2rem] outline-none rounded-[0.5rem] bg-gray-100' 
            />

            <ul className='overflow-y-auto'>
                {
                    people.map((p, index) => (
                        <li key={index} className='group duration-200 pr-[1rem] mb-[2rem] last-child:mb-0 last:mb-0'>
                            <Link href="#" className='flex'>
                                <div className='h-[4rem] w-[4rem] mr-[1rem] grid place-items-center border-[0.25rem] border-gray-100 group-hover:border-gray-300 relative rounded-full duration-150'>
                                    <Image 
                                        height={30} 
                                        width={30} 
                                        src={userPic} 
                                        alt='user profile pic'
                                        className='rounded-full'
                                     />
                                    <span className='absolute h-[1.25rem] w-[1.25rem] right-[-0.2rem] bottom-[-0.2rem] border-[0.25rem] border-white rounded-full bg-[var(--primary-green)]'></span>
                                </div>

                                <div className='flex flex-col justify-center flex-1'>
                                    <div className='flex justify-between'>
                                        <div className='text-[1.25rem] font-bold capitalize'>{p.name}</div>
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

export default PeopleList;