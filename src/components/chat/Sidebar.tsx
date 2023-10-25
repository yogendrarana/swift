// import components

import DesktopSidebar from "@/components/chat/DesktopSidebar"

const ChatsLayout = ({ children }: { children: React.ReactNode }) => { 

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

export default ChatsLayout