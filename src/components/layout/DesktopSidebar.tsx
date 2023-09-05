"use client"


import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';


// import hook
import useSidebar from '@/hooks/useSidebar';


// import types
import { SidebarOptionsType } from '@/types/types';


// import image
import logo from "@/assets/icons/logo.png"


// import components
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const DesktopSidebar = () => {
    const sidebarlinks = useSidebar();

    // handle sidebar option click
    const handleSidebarOptionClick = (option: SidebarOptionsType) => {
        if (option.onClick) {
            return option.onClick();
        }
    }

    return (
        <div className='h-[100vh] flex flex-col items-center border-r'>
            <Image src={logo} height={40} width={40} alt='logo' className='m-[1rem] mb-[2rem]' />

            <ul className='flex flex-col w-full'>
                {
                    sidebarlinks.map((option, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => handleSidebarOptionClick(option)}
                                className={`
                                        w-full
                                        cursor-pointer 
                                        flex 
                                        justify-center 
                                        border-r-[0.25rem]
                                        border-white
                                        duration-200
                                        ${option.active && 'border-[var(--main-green)]'}
                                `}>
                                <Link href={option.href} className='w-full py-[1.75rem] grid place-items-center'>
                                    <i className={`${option.icon} text-[1.25rem] text-[#183D3D]`}></i>
                                    <span className='sr-only'>{option.name}</span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>

            <div className='h-[7.5rem] mt-auto flex items-center text-[2.5rem]'>
                <Avatar className='h-[3.5rem] w-[3.5rem]' onClick={
                    () => {
                        toast.success('You clicked on the avatar');
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