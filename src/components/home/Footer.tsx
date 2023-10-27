import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// import logo
import logo from '@/src/assets/icons/logo.png'

const Footer = () => {
    return (
        <footer className='h-[var(--nav-height)] w-[100%] mt-[5rem] flex justify-between items-center border-t'>
            <div className='flex items-center'>
                <Image src={logo} height={25} alt='logo' width={25} className='mr-[1.5rem]' />
                <span className='text-[1.25rem]'>&copy; 2023 swift.com. All rights reserved.</span>
            </div>
            <Link href="#" className='text-[1.25rem]'>Privacy Policy</Link>
            <Link href="#" className='text-[1.25rem]'>Cookie Policy</Link>
            <Link href="#" className='text-[1.25rem]'>Terms & Conditions</Link>
        </footer>
    )
}

export default Footer