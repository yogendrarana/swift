"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


// import components
import Options from './Options';


// import image
import Logo from "@/assets/icons/logo.png"


// import hook
import useSidebar from '@/hooks/useSidebar';


// import types
import { SidebarOptionsType } from '@/types/types';


const DesktopSidebar = () => {
    const sidebar = useSidebar();

    // handle sidebar option click
    const handleSidebarOptionClick = (option: SidebarOptionsType) => {
        if (option.onClick) {
            return option.onClick();
        }
    }

    return (
        <div 
            className='
                h-[100vh] w-[8rem] flex flex-col items-center border-r md:hidden
                dark:bg-[var(--dmode-black-primary)]
            '
        >
            <Image src={Logo} height={35} width={35} alt='logo' className='m-[1.5rem] mb-[2rem]' />

            <ul className='h-full w-full flex flex-col items-center gap-[0.25rem]'>
                {
                    sidebar.map((option, index) => {
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
                                        ${option.active && 'bg-gray-200 dark:bg-[var(--dmode-black-secondary)]'}
                                        
                                        dark:text-[var(--dmode-white)]
                                        dark:hover:bg-[var(--dmode-black-secondary)]
                                    `}
                                >
                                    <i className={`${option.icon}`}></i>
                                    <span className='sr-only'>{option.name}</span>
                                </Link>
                            </li>
                        )
                    })
                }

                <li className='mt-auto mb-[1rem]'>
                    <Options />
                </li>
            </ul>
        </div>
    )
}

export default DesktopSidebar; 