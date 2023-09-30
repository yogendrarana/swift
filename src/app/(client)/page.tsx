"use client"


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


// import components
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { Button } from "@/components/ui/button";
import Features from "@/components/home/Features";


export default function Home() {
    const router = useRouter();
    const session = useSession();


    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/chats')
        }
    }, [session?.status, router]);


    return (
        <main>
            <div className='px-[10rem] flex flex-col justify-between'>
                <Navbar />

                <div className='h-[calc(100vh-var(--nav-height))] flex gap-[5rem]'>
                    <div className='flex flex-col flex-1 justify-center items-center'>
                        <p className='text-[5rem] leading-none text-center' style={{ background: 'linear-gradient(to right, var(--main-blue), var(--main-green))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Bring your <br /> conversations to life with Swift
                        </p>
                        <p className='my-[3rem] text-[2rem]'>A simple app that lets you text, video call, and stay close to people you care about. </p>
                        <Button className='w-[20rem] px-[1.75rem] py-[2.5rem] text-[1.5rem] text-black hover:bg-[var(--main-blue)] rounded-[5rem] bg-[var(--main-green)]'>Download For Mobile</Button>
                    </div>
                </div>

                <Features />

                <Footer />
            </div>
        </main>
    )
}
