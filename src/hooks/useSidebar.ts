import { useMemo } from "react"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"


// import icons


const useSidebar = () => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            name: 'Chats',
            href: '/chats',
            icon: "fa-solid fa-message",
            active: pathname === '/chats',
        },
        {
            name: 'People',
            href: '/chats/people',
            icon: "fa-solid fa-user-group",
            active: pathname === '/chats/people'
        },
        {
            name: 'Profile',
            href: '/chats/profile',
            icon: "fa-solid fa-user",
            active: pathname === '/chats/profile'
        },
    ], [pathname]);

    return routes;
}

export default useSidebar;