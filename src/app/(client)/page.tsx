"use client"


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


// import components
import Preview from "@/src/components/home/Preview";
import Banner from "@/src/components/home/Banner";
import Footer from "@/src/components/home/Footer";
import Navbar from "@/src/components/home/Navbar";
import Features from "@/src/components/home/Features";


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