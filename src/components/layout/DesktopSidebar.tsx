"use client"


import React from 'react';
import Link from 'next/link';


// import hook
import useSidebarLinks from '@/hooks/useSidebarlinks';


// import types
import { SidebarOptionsType } from '@/types/types';


const DesktopSidebar = () => {
    const sidebarlinks = useSidebarLinks();

    console.log(sidebarlinks)

    // handle sidebar option click
    const handleSidebarOptionClick = (option: SidebarOptionsType) => {
        if (option.onClick) {
            return option.onClick();
        }
    }

    return (
        <div className='h-[100vh] flex'>
            <nav className='h-[100vh] border-r items-center p-[1.5rem]' >
                <ul className='h-[100%] flex flex-col'>
                    {
                        sidebarlinks.map((option, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => handleSidebarOptionClick(option)}
                                    className={` 
                                        ${option.active && 'bg-[#ededed]'} 
                                        p-[1rem] 
                                        cursor-pointer 
                                        grid
                                        place-items-center
                                        rounded-[0.5rem]
                                        duration-200
                                        hover:bg-[#ededed]
                                        last:mt-auto
                                        last:bg-[#ededed]
                                    `}
                                >
                                    <Link href={option.href}>
                                        <i className={`${option.icon} `}></i>
                                        <span className='ml-[0.5rem] sr-only'>{option.name}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}

export default DesktopSidebar; 