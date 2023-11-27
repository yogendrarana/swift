"use client"


import React, { useEffect, useState } from 'react'


// import components
import UserBox from './UserBox';


// import types
import { UserType } from '@/drizzle/schema/user.schema';


// define prop types
type PropType = {
    initialUserList: UserType[]
}


const UserList: React.FC<PropType> = ({ initialUserList }) => {

    return (
        <div className='h-full p-[1rem] flex flex-col'>
            <div className=' h-[4rem] flex items-center text-[2rem] font-bold ' >
                Users
            </div>

            <hr className='my-[1rem]' />

            {/* <input
                type="text"
                autoComplete='off'
                placeholder='Search by name...'
                className='
                    mb-[2rem] p-[1rem] 
                    border-none
                    outline-none 
                    bg-gray-100
                    rounded-[0.5rem]
                    text-[1.25rem]
                    placeholder:text-[1.25rem]
                '
            /> */}

            <ul 
                className='
                    h-full
                    overflow-y-auto 
                    flex flex-col gap-[1rem] 
                '
            >
                {
                    !initialUserList.length ? (
                        <span className='text-[1.25rem] text-gray-600'>
                            No users yet.
                        </span>
                    ) : (
                        initialUserList.map((user: UserType, index: number) => (
                            <UserBox key={index} user={user} />
                        ))
                    )
                }
            </ul>
        </div>
    )
}

export default UserList;