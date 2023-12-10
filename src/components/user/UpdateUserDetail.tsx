"use client"

import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';

// import components
import ConfirmAccountDelete from '../dialog/ConfirmAccountDelete';

// import types
import { UserType } from '@/db/drizzle/schema/user.schema';

// define prop types
type PropType = {
    user: UserType;
}

const UpdateUserDetail = ({ user }: PropType) => {
    const router = useRouter();

    // local state
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [oldPassword, setOldPassword] = React.useState<string>("");
    const [newPassword, setNewPassword] = React.useState<string>("");
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
            if (!updateObject.newName && !updateObject.newEmail) {
                setIsLoading(false);
                return toast.error("Please enter new name or new email.", { id: toastId });
            }
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
            if (!newPassword || !oldPassword) {
                setIsLoading(false);
                return toast.error("Please enter old and new password.", { id: toastId });
            }
            const res = await axios.put(`/api/profile/password?email=${email}`, { ...updatePasswordObject })
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


    // handle delete account
    const handleDeleteAccount = async () => {
        setIsLoading(true);
        const toastId = toast.loading('Deleting account...');
        try {
            const { data, status } = await axios.delete(`/api/account/${user?.id}`);

            if (status === 200) {
                toast.success(data.message, { id: toastId });
                router.push("/")
                setIsLoading(false);
                return;
            }

            return;
        } catch (err: any) {
            setIsLoading(false);
            toast.error(err.response.data.message, { id: toastId });
            return;
        }
    }

    return (
        <div className="pt-[1rem] flex flex-col items-center gap-[2rem]">
            <div className="w-full flex flex-col gap-[3rem]">

                {/* change detail */}
                <div className="w-full flex flex-col gap-[1rem]">
                    <div className='flex justify-between gap-[1rem]'>
                        <div className='flex-1'>
                            <label htmlFor="name" className="text-[1.25rem] block text-gray-700 font-bold mb-1 dark:text-[var(--dmode-white)]">New Name</label>
                            <input
                                type="text"
                                id="newName"
                                value={updateObject.newName}
                                autoComplete='off'
                                onChange={(e) => handleChangedData(e)}
                                className="w-full p-[0.75rem] outline-none border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
                            />
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="email" className="text-[1.25rem] block text-gray-700 font-bold mb-1 dark:text-[var(--dmode-white)]">New Email</label>
                            <input
                                type="email"
                                id="newEmail"
                                value={updateObject.newEmail}
                                autoComplete='off'
                                onChange={(e) => handleChangedData(e)}
                                className="w-full p-[0.75rem] outline-none border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleUpdateUserData}
                        type="button"
                        disabled={isLoading}
                        className={`
                            flex-1 p-[0.75rem] rounded-[0.5rem] bg-gray-200 text-[1.25rem] duration-200 
                            ${isLoading && "opacity-50 cursor-not-allowed"}
                            dark:bg-[var(--dmode-black-secondary)] dark:text-[var(--dmode-white)]
                        `}
                    >
                        Save
                    </button>
                </div>

                {/* change password */}
                <div className="w-full flex flex-col gap-[1rem]">
                    <div className='flex justify-between gap-[1rem]'>
                        <div className='flex-1'>
                            <label htmlFor="old_password" className="flex text-[1.25rem] text-gray-700 font-bold">
                                <span className='mr-auto dark:text-[var(--dmode-white)]'>Old Password</span>
                                <button className='mr-[0.5rem] text-gray-400 text-[1rem]'>
                                </button>
                            </label>
                            <input
                                type="text"
                                id="old_password"
                                autoComplete="new-password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full p-[0.75rem] outline-none border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
                            />
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="new_password" className="flex text-[1.25rem] text-gray-700 font-bold">
                                <span className='mr-auto dark:text-[var(--dmode-white)]'>New Password</span>
                                <button className='mr-[0.5rem] text-gray-400 text-[1rem]'>
                                </button>
                            </label>
                            <input
                                type="text"
                                id="new_password"
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-[0.75rem] outline-none border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={handleChangePassword}
                        className={`
                            flex-1 p-[0.75rem] rounded-[0.5rem] bg-gray-200 text-[1.25rem] duration-200 
                            ${isLoading && "opacity-50 cursor-not-allowed"}
                            dark:bg-[var(--dmode-black-secondary)] dark:text-[var(--dmode-white)]
                        `}
                    >
                        Change Password
                    </button>
                </div>


                {/* delete account */}
                {/* <div className="flex flex-col gap-[0.5rem]">
                    <label className="text-[1.25rem] block text-gray-700 font-bold dark:text-[var(--dmode-white)]">Delete Account</label>
                    <ConfirmAccountDelete func={handleDeleteAccount} />
                </div> */}
            </div>
        </div>
    )
}

export default UpdateUserDetail;