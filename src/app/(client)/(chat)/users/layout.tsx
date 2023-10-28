import React from 'react'


// import components
import UserList from './components/UserList';
import Sidebar from '@/src/components/chat/Sidebar'


const UserLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <Sidebar>
        <div className='h-full flex'>
            <div className='w-[var(--mini-sidebar-width)] '>
                <UserList />
            </div>

            <div className='flex-1'>
                {children}
            </div>
            
        </div>
    </Sidebar>
    )
};

export default UserLayout;