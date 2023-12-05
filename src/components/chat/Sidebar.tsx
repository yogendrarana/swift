// import components
import MobileFooter from "./MobileFooter";
import DesktopSidebar from "@/src/components/chat/DesktopSidebar"

const Sidebar = ({ children }: { children: React.ReactNode }) => { 

    return (
        <section className='flex'>
            <div className='w-[7.5rem]'>
                <DesktopSidebar />
                <MobileFooter />
            </div>

            <main className='flex-1 border-r'>
                {children}
            </main>
        </section>
    )
}

export default Sidebar;