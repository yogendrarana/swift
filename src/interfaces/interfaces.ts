// nav route type
export interface INavMenu {
    label: string,
    href: string,
    icon?: any,
    active?: boolean,
    onClick?: () => void
}

// next auth types
export interface ICredentials {
    email: string;
    password: string;
}