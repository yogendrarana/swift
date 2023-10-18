// import components
import Feed from '@/components/chat/Feed'
import DesktopSidebar from '@/components/chat/DesktopSidebar'

const ChatsLayout = ({ children }: { children: React.ReactNode }) => { 

    return (
        <section className='flex'>
            <div className='w-[10rem]'>
                <DesktopSidebar />
            </div>

            <main className='w-[45rem] border-r'>
                {children}
            </main>

            <div className='bg- w-full'>
                <Feed />
            </div>
        </section>
    )
}

export default ChatsLayout