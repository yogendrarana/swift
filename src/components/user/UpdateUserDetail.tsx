"use client"


import axios from 'axios';
import { set } from 'date-fns';
import { useSession } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';


const UpdateUserDetail = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [oldPassword, setOldPassword] = React.useState<string>("");
    const [newPassword, setNewPassword] = React.useState<string>("");
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [updateObject, setUpdateObject] = React.useState({ newName: "", newEmail: "" });


    // session
    const session = useSession();
    const email = session.data?.user?.email;


    // handle data change
    const handleChangedData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateObject({ ...updateObject, [e.target.id]: e.target.value });
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
                await session.update({ email: updateObject.newEmail });
            }

            setUpdateObject({ newName: "", newEmail: "" });
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            toast.error(err.response.data.message, { id: toastId });
        }
    }


    // handle change password
    const handleChangePassword = async () => {
        setIsLoading(true);
        const toastId = toast.loading("Updating password...");
        const updatePasswordObject = { newPassword, oldPassword }

        try {
            const res = await axios.put(`/api/auth/password?email=${email}`, {...updatePasswordObject})
            if (res.status >= 300) throw Error(res.data.message);
            toast.success(res.data.message, { id: toastId });

            setOldPassword("");
            setNewPassword("");
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
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
                            autoComplete='off'
                            onChange={(e) => handleChangedData(e)}
                            className="w-full p-[0.75rem] outline-none border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-[1.25rem] block text-gray-700 font-bold mb-2">New Email</label>
                        <input
                            type="email"
                            id="newEmail"
                            value={updateObject.newEmail}
                            autoComplete='off'
                            onChange={(e) => handleChangedData(e)}
                            className="w-full p-[0.75rem] outline-none border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
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
                        <label htmlFor="old_password" className="flex text-[1.25rem] text-gray-700 font-bold">
                            <span className='mr-auto'>Old Password</span>
                            <button className='text-gray-400 text-[1rem]' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? (<i className='fa-solid fa-eye-slash'></i>) : (<i className='fa-solid fa-eye'></i>)}
                            </button>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="old_password"
                            autoComplete="new-password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full p-[0.75rem] outline-none border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
                        />
                    </div>
                    <div>
                        <label htmlFor="new_password" className="flex text-[1.25rem] text-gray-700 font-bold">
                            <span className='mr-auto'>New Password</span>
                            <button className='text-gray-400 text-[1rem]' onClick={() => setShowPassword(!showPassword)}>
                                
                                {showPassword ? (<i className='fa-solid fa-eye-slash'></i>) : (<i className='fa-solid fa-eye'></i>)}
                            </button>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="new_password"
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-[0.75rem] outline-none border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
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