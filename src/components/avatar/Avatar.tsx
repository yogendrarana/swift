"use client";

import Image from 'next/image'

// import temporary image
import userPic from '@/src/assets/images/user.jpg'
import useActiveUsers from '@/src/hooks/useActiveUsers'
import { useSession } from 'next-auth/react';
import { UserType } from '@/drizzle/schema/user.schema';

const Avatar = ({ height, width, user }: { height: number, width: number, user: UserType | null }) => {

    const { members } = useActiveUsers();
    const isActive = members.indexOf(user?.email!) !== -1;

    return (
        <div className={`relative`} style={{ height: `${height}px`, width: `${width}px` }}>
            <Image
                height={height}
                width={width}
                src={userPic}
                alt='avatar-img'
                className='rounded-full border'
            />

            <span
                className={`
                    absolute 
                    right-[0.1rem] bottom-[0.1rem] 
                    h-[1.25rem] w-[1.25rem]
                    border-[0.25rem] border-white 
                    rounded-full 
                    ${isActive ? 'bg-[var(--main-green)]' : 'hidden'}
                `}
            >
            </span>
        </div>
    )
}

export default Avatar;