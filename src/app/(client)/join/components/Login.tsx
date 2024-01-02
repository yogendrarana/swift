"use client"

import toast from 'react-hot-toast';
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// import components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (e: any) => {
        setIsLoading(true);
        const toastId = toast.loading("Logging in...");

        if (!email || !password) {
            setIsLoading(false);
            return toast.error('Please fill in all the required fields.', { id: toastId });
        }

        try {
            //next auth signIn returns error, ok, status, url
            const res = await signIn('credentials', { email, password, redirect: false });
            if (res?.error && res.error === "CredentialsSignin") toast.error("Invalid credentials.", { id: toastId });
            if (!res?.error) {
                toast.success("Logged in successfully.", { id: toastId })
                router.push('/chats');
            };
            setIsLoading(false)
        } catch (err: any) {
            setIsLoading(false);
            return toast.error("An error occurred during registration.", { id: toastId });
        }
    }

    return (
        <form className="w-[40rem] flex flex-col gap-[2rem] duration-1000">
            <div className='w-full'>
                <h1 className='text-[1.75rem]'>Already have an account?</h1>
                <p className='text-[1.25rem] text-[#767676]'>Please log in and start sending messages right away.</p>
            </div>

            <Label htmlFor="email" className='w-full text-[1.45rem]'>
                <p>Email</p>
                <Input
                    type="text"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='mt-[0.75rem] px-[1.15rem] py-[1.85rem] text-[1.25rem] placeholder:text-[1.25rem]'
                />
            </Label>

            <Label htmlFor="password" className='w-full text-[1.45rem]'>
                <p>Password</p>
                <Input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='mt-[0.75rem] px-[1.15rem] py-[1.85rem] text-[1.25rem] placeholder:text-[1.25rem]'
                />
            </Label>


            <Button
                onClick={handleLogin}
                type="button"
                disabled={isLoading}
                className='w-[40rem] py-[2rem] text-[1.25rem] shadow-lg bg-black text-white rounded-[0.5rem]'
            >
                Login
            </Button>
        </form>
    )
}

export default Login;