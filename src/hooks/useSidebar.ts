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
            active: pathname.startsWith('/chats'),
        },
        {
            name: 'Users',
            href: '/users',
            icon: "fa-solid fa-user-group",
            active: pathname === '/users'
        },
        {
            name: 'Profile',
            href: '/profile',
            icon: "fa-solid fa-user",
            active: pathname === '/profile'
        },
    ], [pathname]);

    return routes;
}

export default useSidebar;