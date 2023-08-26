import { useMemo } from "react"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"


// import icons
import Chat from '@/assets/icons/chat.png'
import Users from '@/assets/icons/users.png'
import User from '@/assets/icons/user.png'
import Logout from '@/assets/icons/logout.png'


const useRoutes = () => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            name: 'Chats',
            href: '/chats',
            icon: Chat,
            active: pathname === '/chats',
        },
        {
            name: 'People',
            href: '/chats/people',
            icon: Users,
            active: pathname === '/people'
        },
        {
            name: 'Profile',
            href: '/chats/profile',
            icon: User,
            active: pathname === '/profile'
        },
        {
            name: 'Logout',
            href: '#',
            icon: Logout,
            onClick: () => signOut({
                callbackUrl: `${window.location.origin}`
            })
        },
    ], [pathname]);

    return routes;
}

export default useRoutes;