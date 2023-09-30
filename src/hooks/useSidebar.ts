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
            href: '/people',
            icon: "fa-solid fa-user-group",
            active: pathname === '/people'
        },
        {
            name: 'Profile',
            href: '/profile',
            icon: "fa-solid fa-user",
            active: pathname === '/profile'
        },
        {
            name: 'Logout',
            href: '#',
            icon: "fa-solid fa-arrow-right-from-bracket",
            onClick: () => signOut({
                callbackUrl: `${window.location.origin}`
            })
        },
    ], [pathname]);

    return routes;
}

export default useSidebar;