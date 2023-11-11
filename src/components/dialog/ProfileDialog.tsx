"use client"

import React from "react";

// import components
import UserDetail from "../user/UserDetail";
import { Dialog, DialogTrigger, DialogContent } from "@/src/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

// import types
import { UserType } from "@/drizzle/schema/user.schema";
import UpdateUserDetail from "../user/UpdateUserDetail";

// prop type
type ProfileDialogPropsType = {
    user: UserType;
}

const ProfileDialog: React.FC<ProfileDialogPropsType> = ({ user }) => {

    if (!user) {
        return null;
    }

    return (
        <Dialog>
            <DialogTrigger className="w-full p-[1.25rem] text-[1.25rem] flex items-center gap-[1rem] rounded-[1rem] hover:bg-gray-100">
                <i className="fa-solid fa-user"></i>
                <span>Profile</span>
            </DialogTrigger>

            <DialogContent className="min-w-[40rem] p-[3rem]">
                <Tabs defaultValue="account detail" className="w-full">
                    <TabsList className="h-auto w-full p-[0.5rem] grid grid-cols-2 rounded-[0.5rem]">
                        <TabsTrigger value="account detail" className="text-[1.25rem] rounded-[0.5rem]">Account Detail</TabsTrigger>
                        <TabsTrigger value="change detail" className="text-[1.25rem] rounded-[0.5rem]">Change Detail</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account detail">
                        <UserDetail user={user} />
                    </TabsContent>

                    <TabsContent value="change detail">
                        <UpdateUserDetail />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileDialog;