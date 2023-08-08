"use client"

import React from 'react'

// import components
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const AuthForm = () => {
    const [variant, setVariant] = React.useState('register');

    return (
        <form className='h-[100vh] flex relative'>
            <div className={`h-full w-[60%] px-[5rem] py-[4rem] flex flex-col justify-center gap-[2rem] items-center duration-1000 
                ${variant === "login" ? "translate-x-[66.66667%] opacity-0 invisible" : "opacity-100 visible"}`}
            >
                <div className='w-[40rem]'>
                    <p className='text-[#767676] text-[1.25rem] absolute top-[4rem]'>Have an account?<Button type='button' variant="secondary" onClick={() => setVariant("login")} className='text-[1rem] text-[#333333] ml-[0.75rem]'>Login</Button></p>
                    <h1 className='mb-[1.5rem] text-[3rem]'>Welcome to Company Name</h1>
                    <p className='mb-[2rem] text-[1.45rem] text-[#767676]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, sed odio!</p>
                </div>

                <Label htmlFor="email" className='w-[40rem] text-[1.45rem]'>
                    <p>Email</p>
                    <Input type="text" id="email" placeholder="Enter your email" className='mt-[0.75rem] px-[1.15rem] py-[1.85rem] text-[1.25rem] placeholder:text-[1.2rem]' />
                </Label>

                <Label htmlFor="password" className='w-[40rem] text-[1.45rem]'>
                    <p>Create Password</p>
                    <Input type="text" id="password" placeholder="Enter password" className='mt-[0.75rem] px-[1.15rem] py-[1.85rem] placeholder:text-[1.2rem]' />
                </Label>

                <Label htmlFor="c_password" className='w-[40rem] text-[1.45rem]'>
                    <p>Confirm Password</p>
                    <Input type="text" id="c_password" placeholder="Confirm password" className='mt-[0.75rem] px-[1.25rem] py-[1.85rem] placeholder:text-[1rem]' />
                </Label>

                <Button type="submit" className='w-[40rem] py-[2rem] text-[1.25rem] shadow-lg'>Register</Button>
            </div>


            <div className={`h-full w-[60%] px-[5rem] py-[4rem] flex flex-col justify-center items-center gap-[2rem] duration-1000 absolute top-0 left-0 
                ${variant === "login" ? "translate-x-[66.66667%] opacity-100 visible" : "invisible opacity-0"}`}
            >
                <div className='w-[40rem]'>
                    <p className='text-[#767676] text-[1.25rem] absolute top-[4rem]'>New here?<Button type='button' variant="secondary" onClick={() => setVariant("register")} className='text-[1rem] text-[#333333] ml-[0.75rem]'>Register</Button></p>
                    <h1 className='mb-[1.5rem] text-[3rem]'>Welcome to Company Name</h1>
                    <p className='mb-[2rem] text-[1.45rem] text-[#767676]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, sed odio!</p>
                </div>

                <Label htmlFor="email" className='w-[40rem] text-[1.45rem]'>
                    <p>Email</p>
                    <Input type="text" id="email" placeholder="Enter your email" className='mt-[0.75rem] px-[1.15rem] py-[1.85rem] placeholder:text-[1.2rem]' />
                </Label>

                <Label htmlFor="password" className='w-[40rem] text-[1.45rem]'>
                    <p>Password</p>
                    <Input type="text" id="password" placeholder="Enter password" className='mt-[0.75rem] px-[1.15rem] py-[1.85rem] placeholder:text-[1.2rem]' />
                </Label>

                <Button type="submit" className='w-[40rem] py-[2rem] text-[1.25rem] shadow-lg'>Sign Up</Button>
            </div>


            <div className={`w-[40%] ml-[auto] bg-[#24252A] duration-1000 ${variant === "login" ? "translate-x-[-150%]" : ""}`}>
                {/* place image as background */}
            </div>
        </form>
    )
}

export default AuthForm