"use client"

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


// import components
import InputEmoji from "react-input-emoji";
import { CldUploadButton } from "next-cloudinary"


// import hooks
import useChat from "@/hooks/useChat";


const FeedFooter = () => {
    const { chatId } = useChat();
    const [text, setText] = useState('');

    const handleSendText = async () => {
        try {
            setText('');
            const { data, status } = await axios.post("/api/message", { text, chatId });
            if (status > 300) throw new Error(data.message);
        } catch (error: any) {
            setText('');
            toast.error(error.response.data.message);
        }
    }

    // handle upload image
    const handleUploadImage = async (result: any) => {
        try {
            if (result.event === "success") {
                await axios.post("/api/message", {
                    chatId,
                    image: result.info.secure_url,
                    publicId: result.info.public_id
                });
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    }


    return (
        <div className='h-[6rem] border-t flex justify-between items-center gap-[1rem]'>
            <div className='flex-1'>
                <InputEmoji
                    value={text}
                    onChange={setText}
                    cleanOnEnter
                    keepOpened={true}
                    placeholder="Type a message"
                    inputClass="text-input"
                />

                <style>
                    {`
                        .text-input {
                            padding: 1rem 2rem;
                            color: black;
                        }
                    `}
                </style>
            </div>

            <div className='flex gap-[0.5rem]'>
                <CldUploadButton
                    className='
                        h-[4rem] w-[4rem] 
                        text-[1.5rem] 
                        rounded-full 
                        hover:bg-gray-200 
                        duration-200
                    '
                    options={{ maxFiles: 1, multiple: false }}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onUpload={handleUploadImage}
                >
                    <i className="fa-regular fa-image"></i>
                </CldUploadButton>

                <button onClick={() => toast("To be added later")} className='h-[3.5rem] w-[3.5rem] text-[1.5rem] rounded-full hover:bg-gray-200 duration-200'>
                    <i className="fa-solid fa-paperclip"></i>
                </button>

                <button onClick={() => toast("To be added later")} className='h-[3.5rem] w-[3.5rem] text-[1.5rem] rounded-full hover:bg-gray-200 duration-200'>
                    <i className="fa-solid fa-microphone-lines"></i>
                </button>

                <button
                    className='h-[4rem] px-[2.5rem] bg-black text-white text-[1.5rem] rounded-full disabled:cursor-not-allowed'
                    onClick={handleSendText}
                    disabled={text.length === 0}
                >
                    <span>Send</span>
                </button>
            </div>
        </div>
    )
}

export default FeedFooter;