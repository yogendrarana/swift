const FeedFooter = () => {
    return (
        <div className='h-[6rem] border-t flex justify-between items-center gap-[1rem]'>
            <button className='h-[3.5rem] w-[3.5rem] text-[1.5rem] rounded-full bg-gray-200 duration-200'>
                <i className="fa-regular fa-face-smile"></i>
            </button>

            <div className='flex-1'>
                <input
                    type="text"
                    placeholder='Type a message...'
                    className='
                        h-[3.5rem] 
                        w-full 
                        p-[1rem] 
                        text-[1.25rem] 
                        placeholder:text-[1.25rem] 
                        rounded-[1rem] 
                        outline-none
                        bg-gray-100
                    '
                />
            </div>

            <div className='flex gap-[0.5rem]'>
                <button className='h-[3.5rem] w-[3.5rem] text-[1.5rem] rounded-full hover:bg-gray-200 duration-200'>
                    <i className="fa-regular fa-image"></i>
                </button>

                <button className='h-[3.5rem] w-[3.5rem] text-[1.5rem] rounded-full hover:bg-gray-200 duration-200'>
                    <i className="fa-solid fa-paperclip"></i>
                </button>

                <button className='h-[3.5rem] w-[3.5rem] text-[1.5rem] rounded-full hover:bg-gray-200 duration-200'>
                    <i className="fa-solid fa-microphone-lines"></i>
                </button>

                <button className='h-[3.5rem] px-[2rem] bg-black text-white text-[1.5rem] rounded-full'>
                    <span>Send</span>
                </button>
            </div>

        </div>
    )
}

export default FeedFooter;