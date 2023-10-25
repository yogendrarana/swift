"use client"


import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';


// import hook
import useSidebar from '@/hooks/useSidebar';


// import types
import { SidebarOptionsType } from '@/types/types';


// import image
import logo from "@/assets/icons/logo.png"


// import components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const DesktopSidebar = () => {
    const sidebarlinks = useSidebar();

    // handle sidebar option click
    const handleSidebarOptionClick = (option: SidebarOptionsType) => {
        if (option.onClick) {
            return option.onClick();
        }
    }

    return (
        <div className='h-[100vh] w-full flex flex-col items-center border-r'>
            <Image src={logo} height={35} width={35} alt='logo' className='m-[1.5rem] mb-[2rem]' />

            <ul className='flex flex-col gap-[0.25rem] w-full'>
                {
                    sidebarlinks.map((option, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => handleSidebarOptionClick(option)}
                                className={`
                                    w-full
                                    cursor-pointer 
                                    flex justify-center 
                                    duration-200
                                `}
                            >
                                <Link 
                                    href={option.href} 
                                    className={`
                                        h-[4.5rem] w-[4.5rem]
                                        grid place-items-center 
                                        rounded-[0.75rem]
                                        hover:bg-gray-200
                                        text-[1.25rem] text-[#183D3D]
                                        ${option.active && 'bg-gray-200'}
                                    `}
                                >
                                    <i className={`${option.icon}`}></i>
                                    <span className='sr-only'>{option.name}</span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>

            {/* profile button */}
            <div className='h-[7.5rem] mt-auto flex items-center text-[2.5rem]'>
                <Avatar className='h-[3.5rem] w-[3.5rem]' onClick={
                    () => {
                        signOut({
                            callbackUrl: `${window.location.origin}`
                        })
                    }
                }>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default DesktopSidebar; 