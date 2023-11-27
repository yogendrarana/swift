import axios from 'axios'
import toast from 'react-hot-toast'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// import components
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/dialog'

// import ty[es]
import { FullChatType } from '@/src/types/types'

// prop type
type PropType = {
    chat: FullChatType | null | undefined,
}

const ConfirmDeleteChat: React.FC<PropType> = ({ chat }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteChat = async () => {
        setIsLoading(true);
        const toastId = toast.loading('Deleting chat...');
        try {
            const { data, status } = await axios.delete(`/api/chats/${chat?.id}`);

            if (status === 200) {
                toast.success(data.message, { id: toastId });
                router.push("/chats")
                setIsLoading(false);
                return;
            }
        } catch (err: any) {
            setIsLoading(false);
            toast.error(err.response.data.message, { id: toastId });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className='p-[1.75rem] text-[1.25rem] rounded-[0.5rem]'>
                    <i className="fa-solid fa-trash"></i>
                    <span className='ml-[0.75rem]'>Delete</span>
                </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[40rem]'>
                <div className="flex flex-col gap-[1rem]">
                    <h2 className="text-[1.75rem] font-bold">Delete Chat</h2>
                    <p className="text-[1.25rem] text-gray-500">Are you sure you want to delete this chat? This action cannot be undone.</p>
                    <Button variant='destructive' disabled={isLoading} onClick={handleDeleteChat} className='py-[1.75rem] text-[1.25rem]'>
                        Delete
                    </Button>
                    <DialogClose asChild>
                        <Button variant='outline' className='py-[1.75rem] text-[1.25rem]'>Cancel</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmDeleteChat;