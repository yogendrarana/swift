import { useMemo } from "react"
import { usePathname } from "next/navigation"


// import icons
const useSidebar = () => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            name: 'Chats',
            href: '/chats',
            icon: "fa-solid fa-message",
            active: pathname === '/chats' || pathname?.startsWith('/chats/'),
        },
        {
            name: 'Users',
            href: '/users',
            icon: "fa-solid fa-user-group",
            active: pathname === '/users'
        },
    ], [pathname]);

    return routes;
}

export default useSidebar;