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
        <aside 
            className='
                h-full w-[var(--mini-sidebar-width)] p-[1rem] 
                bg-white
                flex flex-col
                overflow-y-auto
                md:fixed
                md:w-full
                md:inset-y-0 
                md:z-[10]
            '
        >
            <div className=' h-[4rem] flex items-center text-[2rem] font-bold ' >
                Users
            </div>

            <hr className='my-[1rem]' />

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
        </aside>
    )
}

export default UserList;