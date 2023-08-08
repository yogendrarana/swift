import React from 'react'

// import components
import { Button } from '../ui/button.tsx'
import MobileNavMenu from './MobileNavMenu.tsx'

const Hero = () => {
    return (
        <section className='flex flex-col justify-center items-center'>
            <MobileNavMenu />
            
            <div className='h-[calc(100vh-var(--nav-height))] w-full flex flex-col gap-[2rem] justify-center items-center'>
                <h2 className='text-[4.5rem] text-center'>Some main <br /> and more text about main topic</h2>

                <p className='mb-[2rem] text-[1.75rem] text-center'>Lorem ipsum dolor sit amet consectetur. Laoreet <br /> arcu commodo nisl tellus.</p>
                <div className='flex gap-[1rem]'>
                    <Button className='text-[1.25rem] rounded-[0.5rem] px-[4rem] py-[2.15rem]'>Button 1</Button>
                    <Button variant="secondary" className='text-[1.25rem] rounded-[0.5rem] px-[4rem] py-[2.15rem] bg-[#ededed]'>Button 2</Button>
                </div>
            </div>
        </section>
        
    )
}

export default Hero