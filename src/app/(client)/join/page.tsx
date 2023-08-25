"use client"


import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


// import components
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'


const Join = () => {
    const router = useRouter();
    const [variant, setVariant] = useState('register');
    const [isLoading, setIsLoading] = useState(false);


    // form states
    const [name, setName] = useState('Abc');
    const [email, setEmail] = useState('abc@gmail.com');
    const [password, setPassword] = useState('password');


    // toggle variant
    const toggleVariant = () => {
        if (variant === "login") { setVariant('register') }
        else setVariant('login')
    }


    // submit handler
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        const toastId = toast.loading("Processing...");

        if (variant === "login") {
            if (!email || !password) {
                setIsLoading(false);
                return toast.error('Please fill in all the required fields.', { id: toastId });
            }

            try {
                //next auth signIn returns error, ok, status, url
                const signInRes = await signIn('credentials', { email, password, redirect: false });
                if (signInRes?.error) toast.error(signInRes.error, { id: toastId });
                if (!signInRes?.error) {
                    toast.success("Logged in successfully.", { id: toastId })
                    router.push('/chats');
                };
                setIsLoading(false)
            } catch (err: any) {
                setIsLoading(false)
                return toast.error(err.message, { id: toastId });
            }
        }

        if (variant === "register") {

            if (!name || !email || !password) {
                setIsLoading(false);
                return toast.error('Please fill in all the required fields.', { id: toastId });
            }

            try {
                const res = await axios.post('/api/auth/register', { name, email, password });
                if (res.data.success && res.status === 201) toast.success(res.data.message, { id: toastId });

                // next auth signIn returns error, ok, status, url
                const signInRes= await signIn('credentials', { email, password, redirect: false });
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
    }


    return (
        <section className='h-[100vh] flex relative'>
            <form className={`h-full w-[60%] px-[5rem] py-[4rem] flex flex-col justify-center gap-[2rem] items-center duration-1000 
                ${variant === "login" ? "translate-x-[66.66667%] opacity-0 invisible" : "opacity-100 visible"}`}
            >
                <div className='w-[40rem]'>
                    <p className='text-[#767676] text-[1.45rem] absolute top-[4rem]'>Have an account?
                        <Button type='button' variant="secondary" onClick={() => setVariant("login")} className='text-[1.25rem] text-[#767676] ml-[0.75rem] rounded-[5rem] px-[1.25rem]'>Login</Button>
                    </p>
                    <h1 className='mb-[1.5rem] text-[3rem]'>Welcome to Company Name</h1>
                    <p className='mb-[2rem] text-[1.45rem] text-[#767676]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, sed odio!</p>
                </div>

                <Label htmlFor="name" className='w-[40rem] text-[1.45rem]'>
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

                <Label htmlFor="email" className='w-[40rem] text-[1.45rem]'>
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

                <Label htmlFor="password" className='w-[40rem] text-[1.45rem]'>
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
                    onClick={handleSubmit}
                    type="button"
                    disabled={isLoading}
                    className='w-[40rem] py-[2rem] text-[1.25rem] shadow-lg bg-blue-500 hover:bg-blue-600'
                >
                    Register
                </Button>
            </form>

            <form className={`h-full w-[60%] px-[5rem] py-[4rem] flex flex-col justify-center items-center gap-[2rem] duration-1000 absolute top-0 left-0 
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
                    <Input
                        type="text"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='mt-[0.75rem] px-[1.15rem] py-[1.85rem] text-[1.25rem] placeholder:text-[1.25rem]'
                    />
                </Label>

                <Label htmlFor="password" className='w-[40rem] text-[1.45rem]'>
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
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className='w-[40rem] py-[2rem] text-[1.25rem] shadow-lg bg-blue-500 hover:bg-blue-600'
                >
                    Login
                </Button>
            </form>

            <div className={`w-[40%] ml-[auto] bg-blue-400 duration-1000 ${variant === "login" ? "translate-x-[-150%]" : ""}`}>
                <div className="h-[100%] flex flex-col justify-center items-center duration-1000">
                    <h1 className='text-[4rem] text-white duration-500'>
                        {variant === "register" ? "Welcome back!" : "Hello stranger!"}
                    </h1>
                    <p className='text-[1.8rem] text-white'>
                        {variant === "register" ? "Already have an account? Click below to log in." : "New here? Click below to register."}
                    </p>

                    <button onClick={toggleVariant} type='button' className='h-[4rem] w-[10rem] mt-[2rem] overflow-hidden grid place-items-center text-[1.5rem] border text-white rounded-full relative duration-200'>
                        <span className={`absolute duration-500 ${variant === 'register' ? "" : "translate-y-[200%]"}`}>Login</span>
                        <span className={`absolute duration-500 ${variant === 'register' ? "translate-y-[-200%]" : ""}`}>Register</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Join