import { UserType } from "@/drizzle/schema/user.schema"
import { ChatType } from "@/drizzle/schema/chat.schema"
import { MessageType } from "@/drizzle/schema/message.schema"


// sidebar types
export interface SidebarOptionsType {
    name: string,
    href: string,
    icon: any,
    active?: boolean,
    onClick?: () => void
}


// chat types
export type FullMessageType = MessageType & {
    sender: UserType
}