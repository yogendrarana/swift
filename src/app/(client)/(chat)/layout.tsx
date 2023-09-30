// import components
import DesktopSidebar from '@/components/chat/DesktopSidebar'

const ChatsLayout = ({ children }: { children: React.ReactNode }) => { 

    return (
        <section className='flex'>
            <DesktopSidebar />

            <main className='w-[35rem] border-r'>
                {children}
            </main>
        </section>
    )
}

export default ChatsLayout