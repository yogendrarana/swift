// import components

import DesktopSidebar from "@/src/components/chat/DesktopSidebar"

const Sidebar = ({ children }: { children: React.ReactNode }) => { 

    return (
        <section className='flex'>
            <div className='w-[7.5rem]'>
                <DesktopSidebar />
            </div>

            <main className='flex-1 border-r'>
                {children}
            </main>
        </section>
    )
}

export default Sidebar;