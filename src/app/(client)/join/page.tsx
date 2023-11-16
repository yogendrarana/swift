"use client"


import { useRouter } from 'next/navigation'


// import components
import Login from './components/Login'
import Register from './components/Register'
import { Button } from '@/src/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs'


const Join = () => {
    const router = useRouter();

    return (
        <section className='h-[100vh] grid place-items-center relative'>
            <Button 
                variant="outline" 
                className='h-[4rem] w-[4rem] text-[1.25rem] rounded-full absolute top-[4rem] left-[4rem]' 
                onClick={() => router.push('/')}
            >
                <i className="fa-solid fa-chevron-left"></i>
            </Button>

            <Tabs defaultValue="LOGIN" className='flex flex-col gap-[1rem]'>
                <TabsList className="h-[4rem] w-full p-[0.5rem] grid grid-cols-2 rounded-[0.5rem]">
                    <TabsTrigger value="LOGIN" className="h-full text-[1.25rem] rounded-[0.5rem]">Login</TabsTrigger>
                    <TabsTrigger value="REGISTER" className="h-full text-[1.25rem] rounded-[0.5rem]">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="LOGIN">
                    <Login />
                </TabsContent>

                <TabsContent value="REGISTER">
                    <Register />
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default Join;