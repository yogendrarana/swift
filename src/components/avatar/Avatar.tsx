import Image from 'next/image'

// import temporary image
import userPic from '@/src/assets/images/user.jpg'

const Avatar = ({ height, width }: { height: number, width: number }) => {
    return (
        <div className={`relative`} style={{ height: `${height}px`, width: `${width}px` }}>
            <Image
                height={height}
                width={width}
                src={userPic}
                alt='avatar-img'
                className='rounded-full border'
            />
            <span
                className='
                    absolute 
                    right-[0.1rem] bottom-[0.1rem] 
                    h-[1.25rem] w-[1.25rem]
                    border-[0.25rem] border-white 
                    rounded-full 
                    bg-[var(--main-green)]
                '
            >
            </span>
        </div>
    )
}

export default Avatar;