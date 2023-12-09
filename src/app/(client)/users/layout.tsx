import React from 'react'


// import components
import UserList from './components/UserList';
import Sidebar from '@/components/chat/Sidebar'


// import actions
import { getAllUsers } from '@/actions/getAllUsers';


const UserLayout = async ({ children }: { children: React.ReactNode }) => {
    const initialUserList = await getAllUsers();

    return (
        <Sidebar>
            <div className='h-full flex'>
                <UserList initialUserList={initialUserList} />

                <div className='flex-1'>
                    {children}
                </div>
            </div>
        </Sidebar>
    )
};

export default UserLayout;