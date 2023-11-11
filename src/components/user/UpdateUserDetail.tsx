"use client"


import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';


const UpdateUserDetail = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [oldPassword, setOldPassword] = React.useState<string>("");
    const [newPassword, setNewPassword] = React.useState<string>("");
    const [updateObject, setUpdateObject] = React.useState({newName: "", newEmail: ""});


    // session
    const session = useSession();
    const email = session.data?.user?.email;


    // handle data change
    const handleChangedData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateObject({...updateObject, [e.target.id]: e.target.value});
    }


    // handle save user data
    const handleUpdateUserData = async () => {
        setIsLoading(true);
        const toastId = toast.loading("Updating user data...");

        try {
            const res = await axios.patch(`/api/profile?email=${email}`, { ...updateObject })
            if (res.status >= 300) throw Error(res.data.message);
            toast.success(res.data.message, { id: toastId });

            // reauthenticate user
            if (updateObject.newEmail) {
                const res = await session.update({email: updateObject.newEmail});
                console.log("res", res);
            } 

            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            toast.error(err.response.data.message, { id: toastId });
        }
    }


    // change password
    const handleChangePassword = async () => {
        const toastId = toast.loading("Updating password...");
        const updatePassword = {newPassword, oldPassword, email}

        try {
            const res = await axios.post("/api/auth/password/change", updatePassword)
            if (res.status >= 3000) throw Error(res.data.message);
            toast.success(res.data.message, { id: toastId });
        }catch (err: any){
            console.log(err.message);
            toast.error(err.response.data.message, { id: toastId });
        }
    }

    return (
        <div className="flex flex-col items-center gap-[2rem]">
            {/* <div className="h-[10rem] w-[10rem] mt-[1rem] rounded-full bg-gray-200"></div> */}

            <div className="w-full flex flex-col gap-[4rem]">
                <div className="w-full flex flex-col gap-[1rem]">
                    <div>
                        <label htmlFor="name" className="text-[1.25rem] block text-gray-700 font-bold mb-2">New Name</label>
                        <input
                            type="text"
                            id="newName"
                            value={updateObject.newName}
                            onChange={(e) => handleChangedData(e)}
                            className="w-full p-[0.75rem] border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-[1.25rem] block text-gray-700 font-bold mb-2">New Email</label>
                        <input
                            type="email"
                            id="newEmail"
                            value={updateObject.newEmail}
                            onChange={(e) => handleChangedData(e)}
                            className="w-full p-[0.75rem] border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
                        />
                    </div>
                    <button
                        onClick={handleUpdateUserData}
                        type="button"
                        disabled={isLoading}
                        className={`flex-1 p-[0.75rem] rounded-[0.5rem] bg-gray-200 text-[1.25rem] duration-200 ${isLoading && "opacity-50 cursor-not-allowed"}`}
                    >
                        Save 
                    </button>
                </div>


                <div className="w-full flex flex-col gap-[1rem]">
                    <div>
                        <label htmlFor="old_password" className="text-[1.25rem] block text-gray-700 font-bold">Old Password</label>
                        <input
                            type="password"
                            id="old_password"
                            autoComplete="new-password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full p-[0.75rem] border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
                        />
                    </div>
                    <div>
                        <label htmlFor="new_password" className="text-[1.25rem] block text-gray-700 font-bold">New Password</label>
                        <input
                            type="password"
                            id="new_password"
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-[0.75rem] border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
                        />
                    </div>

                    <button
                        type="button"
                        disabled={isLoading}
                    onClick={handleChangePassword}
                        className={`flex-1 p-[0.75rem] rounded-[0.5rem] bg-gray-200 text-[1.25rem] duration-200 ${isLoading && "opacity-50 cursor-not-allowed"}`}
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateUserDetail;