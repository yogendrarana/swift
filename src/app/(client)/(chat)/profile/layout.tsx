import React from "react"

// import components
import Sidebar from "@/src/components/chat/Sidebar"
import MyProfile from "./components/MyProfile"

const ProfileLayout = async ({children}: {children: React.ReactNode}) => {


    return (
        <div>
             <Sidebar>
            <div className='h-full flex'>
                <div className='w-[var(--mini-sidebar-width)] '>
                    <MyProfile />
                </div>
                
                {children}
            </div>
        </Sidebar>
        </div>
    )
}

export default ProfileLayout