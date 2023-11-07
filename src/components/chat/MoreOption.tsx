"use client"

import { useRouter } from 'next/navigation';

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
    DialogTrigger,
} from "@/src/components/ui/dialog"
import SettingDialog from '../dialog/SettingDialog';


const MoreOption = () => {
    const router = useRouter()
    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className='
                            h-[4rem] w-[4rem]
                            border text-[1.75rem]
                            rounded-[0.75rem]
                            text-[#183D3D]
                            hover:bg-gray-200
                        '
                >
                    <i className="fa-solid fa-bars"></i>
                </DropdownMenuTrigger>

                <DropdownMenuContent className='w-[25rem] ml-[1.75rem] mb-[0.5rem] p-[1.5rem] rounded-[1rem]'>
                    <DropdownMenuLabel className='p-[1.25rem] text-[1.75rem]'>More Options</DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    
                    <DialogTrigger className='w-full p-[1.25rem] text-[1.25rem] flex items-center gap-[1rem] rounded-[1rem] hover:bg-gray-100'>
                        <i className="fa-solid fa-user"></i>
                        <span>Profile</span>
                    </DialogTrigger>

                    <DropdownMenuItem className='p-[1.25rem] text-[1.25rem] flex gap-[1rem] rounded-[1rem] cursor-pointer'>
                        <i className="fa-solid fa-moon"></i>
                        <span>Toggle Mode</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/*** setting dialog ***/}
            <SettingDialog />
        </Dialog>
    )
}

export default MoreOption;