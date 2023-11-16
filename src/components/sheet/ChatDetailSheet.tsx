import React from 'react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

// import components
import Avatar from '@/src/components/avatar/Avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet'

// import hooks
import useOtherUser from '@/src/hooks/useOtherUser'

// import types
import { FullChatType } from '@/src/types/types'

// prop type
type PropType = {
    chat: FullChatType | null | undefined,
    statusText: string
}

const ChatDetailSheet: React.FC<PropType> = ({ statusText, chat }) => {

    const otherUser = useOtherUser(chat);

    const handleChatDelete = () => {
        toast.success("Chat deletion to be added later");
    }

    return (
        <Sheet>
            <SheetTrigger className='text-[1.25rem] h-[3.5rem] w-[3.5rem] hover:bg-gray-200 rounded-full duration-200'>
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </SheetTrigger>
            <SheetContent side="right" className='min-w-[40rem] py-[5rem] flex flex-col gap-[2rem]'>
                <div className='flex gap-[0.5rem] flex-col items-center'>
                    <Avatar height={50} width={50} />
                    <p className='text-[1.25rem] text-gray-500'>{statusText}</p>
                </div>

                {!chat?.isGroupChat && <div className="flex flex-col gap-[0.5rem]">
                    <h2 className="text-[1.5rem] font-bold"> Email </h2>
                    <div className="p-[0.5rem] border rounded-[0.5rem] text-[1.25rem] text-gray-500">
                        {otherUser && otherUser?.user.email}
                    </div>
                </div>}


                {chat?.isGroupChat && <div className="flex flex-col gap-[0.5rem]">
                    <h2 className="text-[1.5rem] font-bold"> Members </h2>
                    <ul className="rounded-[0.5rem] text-[1.25rem] text-gray-500">
                        {
                            chat.members.map((member, index) => (
                                <li key={index} className="mb-[1rem] capitalize">{index+1}. {member.user.name}</li>
                            ))
                        }
                    </ul>
                </div>}

                <div className="flex flex-col gap-[0.5rem]">
                    <h2 className="text-[1.5rem] font-bold"> Joined At </h2>
                    <div className="p-[0.5rem] border rounded-[0.5rem] text-[1.25rem] text-gray-500">
                        {chat && format(new Date(chat.createdAt), 'h:mm a')}
                    </div>
                </div>

                <div className="flex flex-col gap-[0.5rem]">
                    <h2 className="text-[1.5rem] font-bold text-red-500"> Delete Chat </h2>
                    <button onClick={handleChatDelete} className="p-[0.5rem] text-red-500 border rounded-[0.5rem] text-[1.25rem]">
                        <i className="fa-solid fa-trash"></i>
                        <span className='ml-[0.75rem]'>Delete</span>
                    </button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default ChatDetailSheet;