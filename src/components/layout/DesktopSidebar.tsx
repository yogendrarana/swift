"use client"


import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


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
                                    className="cursor-pointer flex justify-center items-center p-[1rem] rounded-lg duration-200 hover:bg-[#ededed]"
                                >
                                    <Link href={option.href}>
                                        <Image height={20} width={20} src={option.icon} alt={option.name} />
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