import { UserType } from "@/db/drizzle/schema/user.schema"
import { ChatType } from "@/db/drizzle/schema/chat.schema"
import { MessageType } from "@/db/drizzle/schema/message.schema"


// sidebar types
export interface SidebarOptionsType {
    name: string,
    href: string,
    icon: any,
    active?: boolean,
    onClick?: () => void
}


// message types
export type FullMessageType = MessageType & {
    sender: UserType
}


// chat types
export type FullChatType = ChatType & {
    admin: UserType | null,
    members: { user: UserType }[]
}