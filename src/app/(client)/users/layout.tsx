import React from 'react'


// import components
import UserList from './components/UserList';
import Sidebar from '@/src/components/chat/Sidebar'


// import actions
import { getAllUsers } from '@/src/actions/getAllUsers';


const UserLayout = async ({ children }: { children: React.ReactNode }) => {
    const initialUserList = await getAllUsers();

    return (
        <Sidebar>
            <div className='h-full flex'>
                <div className='w-[var(--mini-sidebar-width)] '>
                    <UserList initialUserList={initialUserList} />
                </div>

                <div className='flex-1'>
                    {children}
                </div>
            </div>
        </Sidebar>
    )
};

export default UserLayout;