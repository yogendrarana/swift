"use client"


import React from 'react';
import Link from 'next/link';


// import hook
import useRoutes from '@/hooks/useSidebarlinks';


// import types
import { SidebarOptionsType } from '@/types/types';


const DesktopSidebar = () => {
    const routes = useRoutes();

    // handle sidebar option click
    const handleSidebarOptionClick = (option: SidebarOptionsType) => {
        if (option.onClick) {
            return option.onClick();
        }
    }

    return (
        <div className='h-[100vh] flex'>
            <nav className='h-[100vh] border-r flex flex-col items-center gap-[1.5rem] p-[1.5rem]' >
                <ul>
                    {
                        routes.map((option, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => handleSidebarOptionClick(option)}
                                    className={`mb-[0.5rem] cursor-pointer flex justify-center items-center p-[1rem] rounded-lg duration-200 hover:bg-[#ededed] ${option.active ? 'bg-blue-500' : ''}}`}
                                >
                                    <Link href={option.href}>
                                        <i className={`${option.icon} text-[1.5rem]`}></i>
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