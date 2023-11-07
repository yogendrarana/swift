"use client"


import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// import hook
import useSidebar from '@/src/hooks/useSidebar';

// import types
import { SidebarOptionsType } from '@/src/types/types';

// import image
import logo from "@/src/assets/icons/logo.png"

// import components
import MoreOption from './MoreOption';


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

            {/* dropdown menu */}
            <div className='mt-auto mb-[1rem]'>
                <MoreOption />
            </div>
        </div>
    )
}

export default DesktopSidebar; 