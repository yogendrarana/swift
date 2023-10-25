import React from "react"

// import components
import Sidebar from "@/components/chat/Sidebar"
import MyProfile from "./components/MyProfile"

const ProfileLayout = async ({children}: {children: React.ReactNode}) => {


    return (
        <div>
            <Sidebar>
                <div className='h-full flex'>
                    <MyProfile />
                    {children}
                </div>
            </Sidebar>
        </div>
    )
}

export default ProfileLayout