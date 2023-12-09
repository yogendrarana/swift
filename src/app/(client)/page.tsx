"use client"


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


// import components
import Banner from "@/components/home/Banner";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import Preview from "@/components/home/Preview";
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
            <div className='px-[10rem] flex flex-col gap-[1rem] lg:px-[8rem] md:px-[5rem] sm:px-[2rem]'>
                <Navbar />
                <Banner />
                <Features />
                <Preview />
                <Footer />
            </div>
        </main>
    )
}