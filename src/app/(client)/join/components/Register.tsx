"use client"

import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// import components
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Button } from '@/src/components/ui/button';

const Register = () => {
    const router = useRouter();
    const [name, setName] = useState('Abc');
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('abc@gmail.com');
    const [password, setPassword] = useState('password');


    const handleRegister = async () => {
        setIsLoading(true);

        const toastId = toast.loading("Registering...");

        if (!name || !email || !password) {
            setIsLoading(false);
            return toast.error('Please fill in all the required fields.', { id: toastId });
        }

        try {
            const res = await axios.post('/api/auth/register', { name, email, password });
            if (res.data.success && res.status === 201) toast.success(res.data.message, { id: toastId });

            // next auth signIn returns error, ok, status, url
            const signInRes = await signIn('credentials', { email, password, redirect: false });
            if (signInRes?.error) toast.error(signInRes?.error, { id: toastId });
            if (signInRes?.ok) {
                toast.success("Logged in successfully.", { id: toastId })
                router.push('/chats');
            };
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            if (err.response && err.response.data && err.response.data.message) {
                return toast.error(err.response.data.message, { id: toastId });
            } else {
                return toast.error("An error occurred during registration.", { id: toastId });
            }
        }
    }

    return (
        <form className="w-[40rem] flex flex-col gap-[2rem] duration-1000">
            <div className='w-full'>
                <h1 className='text-[1.75rem]'>Don&apos;t have an account?</h1>
                <p className='text-[1.25rem] text-[#767676]'>Create an account to get started with our platform.</p>
            </div>

            <Label htmlFor="name" className='w-full text-[1.45rem]'>
                <p>Pick your avatar</p>
                <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='mt-[0.75rem] px-[1.25rem] py-[1.85rem] text-[1.25rem] placeholder:text-[1.25rem]'
                />
            </Label>


            <Label htmlFor="name" className='w-full text-[1.45rem]'>
                <p>Name</p>
                <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='mt-[0.75rem] px-[1.25rem] py-[1.85rem] text-[1.25rem] placeholder:text-[1.25rem]'
                />
            </Label>

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
                    type="text"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='mt-[0.75rem] px-[1.15rem] py-[1.85rem] text-[1.25rem] placeholder:text-[1.25rem]'
                />
            </Label>


            <Button
                onClick={handleRegister}
                type="button"
                disabled={isLoading}
                className='w-[40rem] py-[2rem] text-[1.25rem] shadow-lg bg-black text-white rounded-[0.5rem]'
            >
                Register
            </Button>
        </form>
    )
}

export default Register;