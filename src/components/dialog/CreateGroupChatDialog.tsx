"use client"

import React from "react";
import ReactSelect from "react-select"

// import components
import {
    Dialog,
    DialogTitle,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogDescription
} from "@/src/components/ui/dialog"
import { stat } from "fs";

// prop type
interface Option {
    value: string;
    label: string;
}

// options
const options: Option[] = [
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
];


const CreateGroupChatDialog = () => {
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        // Check if the option is already selected
        const isSelected = selectedOptions.includes(value);

        // Update selected options based on the current state
        setSelectedOptions((prevSelected) =>
            isSelected
                ? prevSelected.filter((option) => option !== value)
                : [...prevSelected, value]
        );
    };

    return (
        <Dialog>
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
                        type="text"
                        className="w-full p-[0.75rem] outline-none border rounded-[0.5rem] text-gray-700 text-[1.25rem]"
                    />
                </div>

                <div className="flex flex-col gap-[0.5rem]">
                    <label className="text-[1.25rem] font-bold">Select options:</label>
                    <ReactSelect
                        isMulti
                        options={options}
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
                    className="p-[1rem] bg-black text-white text-[1.25rem] rounded-[0.5rem]"
                >
                    Create
                </button>
            </DialogContent>
        </Dialog>
    )
}

export default CreateGroupChatDialog;