import React from 'react'
import toast from 'react-hot-toast';


// import types
import { UserType } from '@/db/drizzle/schema/user.schema'


// prop type
type UserDetailPropsType = {
    user: UserType;
}

const UserDetail: React.FC<UserDetailPropsType> = ({ user }) => {
    return (
        <div className="flex flex-col items-center gap-[2rem]">
            {/* <div className="h-[10rem] w-[10rem] mt-[1rem] rounded-full bg-gray-200"></div> */}

            <div className="w-full flex flex-col gap-[1rem]">
                <div className="flex flex-col gap-[0.5rem]">
                    <label className="text-[1.25rem] block text-gray-700 font-bold dark:text-[var(--dmode-white)]">Name</label>
                    <p className="w-full p-[0.75rem] bg-gray-100 rounded-[0.5rem] text-gray-700 text-[1.25rem]">{user?.name}</p>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                    <label className="text-[1.25rem] block text-gray-700 font-bold dark:text-[var(--dmode-white)]">Email</label>
                    <p className="w-full p-[0.75rem] bg-gray-100 rounded-[0.5rem] text-gray-700 text-[1.25rem]">{user?.email}</p>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                    <label className="text-[1.25rem] block text-gray-700 font-bold dark:text-[var(--dmode-white)]">Role</label>
                    <p className="w-full p-[0.75rem] bg-gray-100 rounded-[0.5rem] text-gray-700 text-[1.25rem]">{user?.role}</p>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                    <label className="text-[1.25rem] block text-gray-700 font-bold dark:text-[var(--dmode-white)]">Account Status</label>
                    <div className="flex gap-[1rem]">
                        <p className="w-2/3 p-[0.75rem] bg-gray-100 rounded-[0.5rem] text-gray-700 text-[1.25rem]">{user?.isVerified ? "Verified" : "Not Verified"}</p>
                        <button
                            onClick={() => toast("Verify email")}
                            className="w-1/3 p-[0.75rem] text-[1.25rem] bg-black text-white rounded-[0.5rem] dark:bg-[var(--dmode-black-secondary)] dark:text-[var(--dmode-white)]"
                        >Verify</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail