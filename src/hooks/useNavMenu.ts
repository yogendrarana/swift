const useNavMenu = () => {
    const routes = [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'About',
            href: '/about',
        },
        {
            label: 'Contact',
            href: '/contact',
        },
    ]

    return routes;
}

export default useNavMenu;