"use client"


import React from 'react'
import Link from 'next/link';


// import components
import Options from './Options';


// import hooks
import useSidebar from '@/src/hooks/useSidebar'


// import types
import { SidebarOptionsType } from '@/src/types/types';


const MobileFooter = () => {
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
                    hidden 
                    md:h-[7rem]
                    md:w-full 
                    md:z-40 
                    md:bg-white 
                    md:fixed md:bottom-0 
                    md:flex md:justify-between md:items-center 
                    md:border-t-[0.1rem] 
                    dark:bg-[var(--dmode-black-primary)]
                '
        >
            <ul className='h-full w-full p-[1rem] flex justify-around items-center gap-[0.25rem]'>
                {
                    sidebar.map((option, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => handleSidebarOptionClick(option)}
                                className={`
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

                <li className=''>
                    <Options />
                </li>
            </ul>
        </div>
    )
}

export default MobileFooter;