import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button.tsx';

// import hooks
import useNavMenu from '@/hooks/useNavMenu.ts';

const MobileNavMenu = () => {
    const routes = useNavMenu();

    return (
        <nav className='w-[100%] flex items-center px-[--main-padding] h-[var(--nav-height)]'>
            <div className='mr-auto text-[2rem]'>Company.</div>
            <ul className='flex items-center'>
                {routes.map((route, index) => (
                    <li key={index} className='mr-[4rem] text-[1.5rem]'>
                        <Link href={route.href}>{route.label}</Link>
                    </li>
                ))}

                <Button asChild className='text-[1.5rem] px-[2.5rem] py-[1.75rem] bg-[#24252a] text-white rounded-[0.5rem] shadow-md'>
                    <Link href="/join">Join</Link>
                </Button>
            </ul>
        </nav>
    )
}

export default MobileNavMenu;