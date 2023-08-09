const useNavlinks = () => {
    const routes = [
        {
            label: "Home",
            href: '/',
        },
        { 
            label: "Features", 
            href: '/features' 
        },
        { 
            label: "Join", 
            href: '/join' 
        }
    ]

    return routes;
}

export default useNavlinks;