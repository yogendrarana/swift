import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/dialog'

// prop type
type PropType = {
    handleDeleteChat: () => void;
    isLoading: boolean;
}

const ConfirmDeleteChat: React.FC<PropType> = ({ handleDeleteChat, isLoading }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={isLoading} variant='outline' className='p-[1.75rem] text-[1.25rem]'>
                    <i className="fa-solid fa-trash"></i>
                    <span className='ml-[0.75rem]'>Delete</span>
                </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[40rem]'>
                <div className="flex flex-col gap-[1rem]">
                    <h2 className="text-[1.75rem] font-bold">Delete Chat</h2>
                    <p className="text-[1.25rem] text-gray-500">Are you sure you want to delete this chat? This action cannot be undone.</p>
                    <Button variant='destructive' onClick={handleDeleteChat} className='py-[1.75rem] text-[1.25rem]'>Delete</Button>
                    <DialogClose asChild>
                        <Button variant='outline' className='py-[1.75rem] text-[1.25rem]'>Cancel</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmDeleteChat;