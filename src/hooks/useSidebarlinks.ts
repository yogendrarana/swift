import { useMemo } from "react"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"


// import icons
import Chat from '@/assets/icons/chat.png'
import User from '@/assets/icons/user.png'
import Users from '@/assets/icons/users.png'
import Logout from '@/assets/icons/logout.png'


const useSidebarLinks = () => {
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
        {
            name: 'Settings',
            href: 'chats/settings',
            icon: "fa-solid fa-cog",
            active: pathname === '/chats/settings'
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

export default useSidebarLinks;