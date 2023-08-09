"use client"

import React from 'react'

// import components
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const Join = () => {
    const [variant, setVariant] = React.useState('register');

    return (
        <form className='h-[100vh] flex relative'>
            <div className={`h-full w-[60%] px-[5rem] py-[4rem] flex flex-col justify-center gap-[2rem] items-center duration-1000 
                ${variant === "login" ? "translate-x-[66.66667%] opacity-0 invisible" : "opacity-100 visible"}`}
            >
                <div className='w-[40rem]'>
                    <p className='text-[#767676] text-[1.45rem] absolute top-[4rem]'>Have an account?
                        <Button type='button' variant="secondary" onClick={() => setVariant("login")} className='text-[1.25rem] text-[#767676] ml-[0.75rem] rounded-[5rem] px-[1.25rem]'>Login</Button>
                    </p>
                    <h1 className='mb-[1.5rem] text-[3rem]'>Welcome to Company Name</h1>
                    <p className='mb-[2rem] text-[1.45rem] text-[#767676]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, sed odio!</p>
                </div>

                <Label htmlFor="email" className='w-[40rem] text-[1.45rem]'>
                    <p>Email</p>
                    <Input type="text" id="email" placeholder="Enter your email" className='mt-[0.75rem] px-[1.15rem] py-[1.85rem] text-[1.25rem] placeholder:text-[1.25rem]' />
                </Label>

                <Label htmlFor="password" className='w-[40rem] text-[1.45rem]'>
                    <p>Create Password</p>
                    <Input type="text" id="password" placeholder="Enter password" className='mt-[0.75rem] px-[1.15rem] py-[1.85rem] placeholder:text-[1.25rem]' />
                </Label>

                <Label htmlFor="c_password" className='w-[40rem] text-[1.45rem]'>
                    <p>Confirm Password</p>
                    <Input type="text" id="c_password" placeholder="Confirm password" className='mt-[0.75rem] px-[1.25rem] py-[1.85rem] placeholder:text-[1.25rem]' />
                </Label>

                <Button type="submit" className='w-[40rem] py-[2rem] text-[1.25rem] shadow-lg bg-blue-500 hover:bg-blue-600'>Register</Button>
            </div>


            <div className={`h-full w-[60%] px-[5rem] py-[4rem] flex flex-col justify-center items-center gap-[2rem] duration-1000 absolute top-0 left-0 
                ${variant === "login" ? "translate-x-[66.66667%] opacity-100 visible" : "invisible opacity-0"}`}
            >
                <div className='w-[40rem]'>
                    <p className='text-[#767676] text-[1.45rem] absolute top-[4rem]'>New here?
                        <Button type='button' variant="secondary" onClick={() => setVariant("register")} className='text-[1.25rem] text-[#767676] ml-[0.75rem] rounded-[5rem] px-[1.25rem]'>Register</Button>
                    </p>
                    <h1 className='mb-[1.5rem] text-[3rem]'>Welcome to Company Name</h1>
                    <p className='mb-[2rem] text-[1.45rem] text-[#767676]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, sed odio!</p>
                </div>

                <Label htmlFor="email" className='w-[40rem] text-[1.45rem]'>
                    <p>Email</p>
                    <Input type="text" id="email" placeholder="Enter your email" className='mt-[0.75rem] px-[1.15rem] py-[1.85rem] placeholder:text-[1.25rem]' />
                </Label>

                <Label htmlFor="password" className='w-[40rem] text-[1.45rem]'>
                    <p>Password</p>
                    <Input type="text" id="password" placeholder="Enter password" className='mt-[0.75rem] px-[1.15rem] py-[1.85rem] placeholder:text-[1.25rem]' />
                </Label>

                <Button type="submit" className='w-[40rem] py-[2rem] text-[1.25rem] shadow-lg bg-blue-500 hover:bg-blue-600'>Login</Button>
            </div>


            <div className={`w-[40%] ml-[auto] bg-blue-400 duration-1000 ${variant === "login" ? "translate-x-[-150%]" : ""}`}>
            </div>
        </form>
    )
}

export default Join