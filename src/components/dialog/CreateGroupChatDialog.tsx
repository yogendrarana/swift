"use client"


import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import ReactSelect from "react-select"
import { useRouter } from "next/navigation";


// import components
import {
    Dialog,
    DialogTitle,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogDescription
} from "@/src/components/ui/dialog"


// import types
import { UserType } from "@/drizzle/schema/user.schema";


// prop type
type PropType = {
    users: UserType[];
}

type OptionType = {
    value: number;
    label: string;
    email: string;
}


const CreateGroupChatDialog: React.FC<PropType> = ({ users=[] }) => {
    const router = useRouter()
    const [name, setName] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [members, setMembers] = React.useState<OptionType[]>([]);

    // handle create group chat
    const handleCreateGroupChat = async () => {
        setIsLoading(true);
        const toastId = toast.loading('Creating group chat...');

        if (members.length === 0) {
            setIsLoading(false);
            return toast.error('Please select at least one user.', { id: toastId });
        }

        if (!name) {
            setIsLoading(false);
            return toast.error('Please enter group name.', { id: toastId });
        }

        try {
            const { data, status } = await axios.post('/api/chats', { name, members, isGroupChat: true });
            if (data.success && status === 201) toast.success(data.message, { id: toastId });

            if (status >= 300) throw new Error();
            if (status === 201 || status === 200) {
                router.push(`/chats/${data.chatId}`);
            }
            setIsLoading(false);
            setOpen(false);
        } catch (err: any) {
            setIsLoading(false);
            if (err.response && err.response.data && err.response.data.message) {
                return toast.error(err.response.data.message, { id: toastId });
            } else {
                return toast.error("An error occurred, please try again.", { id: toastId });
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='h-[3.5rem] w-[3.5rem] rounded-full text-[1rem] hover:bg-gray-100 duration-200'>
                <i className="fa-solid fa-user-plus"> </i>
            </DialogTrigger>

            <DialogContent className="h-auto min-w-[40rem] p-[3rem] flex flex-col gap-[1rem]">
                <DialogHeader>
                    <DialogTitle className="text-[1.75rem]">Create Group Chat</DialogTitle>
                    <DialogDescription className="text-[1.25rem] text-gray-400">
                        Add at least one user to create group chat.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-[0.5rem]">
                    <label className="text-[1.25rem] font-bold">Group Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="w-full p-[0.75rem] outline-none border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
                    />
                </div>

                <div className="flex flex-col gap-[0.5rem]">
                    <label className="text-[1.25rem] font-bold">Select members:</label>
                    <ReactSelect
                        isMulti
                        options={users.map((user) => ({ value: user.id, label: user.name, email: user.email }))}
                        onChange={(value) => setMembers(value as OptionType[])}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                fontSize: '1.25rem',
                                borderColor: state.isFocused ? '#ededed' : '#ededed',
                                boxShadow: 'none',
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                fontSize: '1.25rem',
                            }),
                            multiValue: (provided, state) => ({
                                ...provided,
                                fontSize: '1.5rem',
                            }),
                        }}
                    />
                </div>

                <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleCreateGroupChat}
                    className="p-[1rem] bg-black text-white text-[1.25rem] rounded-[0.5rem]"
                >
                    Create
                </button>
            </DialogContent>
        </Dialog>
    )
}

export default CreateGroupChatDialog;