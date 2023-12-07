import Image from "next/image"
import { motion } from "framer-motion"

// import image
import Preview1 from '@/src/assets/images/preview-1.png'
import Preview2 from '@/src/assets/images/preview-2.png'

const Preview = () => {
    return (
        <div className="">
            <h2
                className="mb-[2rem] text-[5rem] font-bold text-center"
            >
                Preview
            </h2>

            <div className="flex gap-[1rem] sm:flex-col">
                <motion.div
                    className="relative border rounded-[1rem] overflow-hidden"
                    initial={{ y: "20%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image src={Preview1} alt="chat image" />
                    <div
                        className="
                            absolute inset-0 
                            opacity-[0.25] 
                            z-[5]
                            bg-gradient-to-b from-gray-200 to-gray-500
                        "
                    >
                    </div>
                </motion.div>

                <motion.div
                    className="relative border rounded-[1rem] overflow-hidden"
                    initial={{ y: "20%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image src={Preview2} alt="chat image" />
                    <div
                        className="
                            absolute inset-0 
                            opacity-[0.25] 
                            z-[5]
                            bg-gradient-to-b from-gray-200 to-gray-500
                        "
                    >
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Preview;