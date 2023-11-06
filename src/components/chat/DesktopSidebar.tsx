"use client"


import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// import hook
import useSidebar from '@/src/hooks/useSidebar';

// import types
import { SidebarOptionsType } from '@/src/types/types';

// import image
import logo from "@/src/assets/icons/logo.png"


// import components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog"


const DesktopSidebar = () => {
    const router = useRouter();
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
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className='
                            h-[4rem] w-[4rem]
                            mt-auto mb-[1rem] 
                            border text-[1.75rem]
                            rounded-[0.75rem]
                            text-[#183D3D]
                            hover:bg-gray-200
                        '
                    >
                        <i className="fa-solid fa-bars"></i>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className='w-[20rem] ml-[1.75rem] mb-[0.5rem] p-[1.5rem] rounded-[1rem]'>
                        <DropdownMenuLabel className='p-[1.25rem] text-[1.75rem]'>More Options</DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className='p-[1.25rem] text-[1.25rem] flex gap-[1rem] rounded-[1rem]'
                            onClick={() => router.push('/profile')}
                        >
                            <i className="fa-solid fa-user"></i>
                            <span>Profile</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className='p-[1.25rem] text-[1.25rem] flex gap-[1rem] rounded-[1rem]'>
                            <i className="fa-solid fa-moon"></i>
                            <span>Toggle Mode</span>
                        </DropdownMenuItem>


                        <DialogTrigger className='w-full p-[1.25rem] text-[1.25rem] flex items-center gap-[1rem] rounded-[1rem] bg-gray-100'>
                            <i className="fa-solid fa-cog"></i>
                            <span>Setting</span>
                        </DialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* setting dialog */}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DesktopSidebar; 