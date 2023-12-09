// import components
import MobileFooter from "./MobileFooter";
import DesktopSidebar from "@/components/chat/DesktopSidebar"

const Sidebar = ({ children }: { children: React.ReactNode }) => {

    return (
        <section className='min-h-[100vh] flex'>
            <DesktopSidebar />
            <MobileFooter />

            <main className='flex-1 border-r'>
                {children}
            </main>
        </section>
    )
}

export default Sidebar;