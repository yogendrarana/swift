import axios from "axios";
import { useEffect, useCallback, useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import ProfileDialog from '../dialog/ProfileDialog';

// import session hook
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Options = () => {

    const session = useSession();
    const email = session?.data?.user?.email;
    const [user, setUser] = useState(null);

    const fetchProfileData = useCallback(async () => {
        try {
            const { data, status } = await axios.get(`/api/profile?email=${email}`);
            if (status >= 300) {
                throw new Error("Cannot fetch profile data!");
            }
            setUser(data.user);
        } catch (err: any) {
            toast.error(err.message);
        }
    }, [email]);

    useEffect(() => {
        if (email) {
            fetchProfileData();
        }
    }, [email, fetchProfileData]);

    return (
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

                {/* dialog as dropdown menu */}
                {user && <ProfileDialog user={user} />}

                <DropdownMenuItem className='p-[1.25rem] text-[1.25rem] flex gap-[1rem] rounded-[1rem] cursor-pointer'>
                    <i className="fa-solid fa-moon"></i>
                    <span>Toggle Mode</span>
                </DropdownMenuItem>

                <DropdownMenuItem 
                    onClick={async () => await signOut({callbackUrl: '/'})}
                    className='p-[1.25rem] text-[1.25rem] flex gap-[1rem] rounded-[1rem] cursor-pointer'>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>Log Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Options;