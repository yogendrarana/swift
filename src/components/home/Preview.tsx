import Image from "next/image"
import { motion } from "framer-motion"

// import image
import Preview1 from '@/src/assets/images/preview-1.png'
import Preview2 from '@/src/assets/images/preview-2.png'

const Preview = () => {
    return (
        <div>
            <h2 className="mb-[2rem] text-[5rem] font-bold text-center text-gray-600" > Preview </h2>

            <div className="relative flex items-center gap-[1rem] sm:flex-col rounded-[1rem] shadow-lg sm:shadow-none">
                {/* preview 1 */}
                <motion.div
                    className="p-[1rem] relative border rounded-[1rem] overflow-hidden bg-white sm:hidden"
                    initial={{ y: "30%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image src={Preview1} alt="chat image" />
                </motion.div>

                {/* preview 2 */}
                <motion.div
                    className="
                        h-[42rem] w-[28rem] p-[1rem] 
                        bg-white 
                        absolute bottom-[-2rem] left-[-2rem] 
                        border-2 border-gray-200 rounded-[1rem] 
                        overflow-auto shadow-lg
                        lg:hidden
                        sm:flex
                        sm:relative
                        sm:w-[80%]
                        sm:h-[60rem]
                    "
                    initial={{ y: "30%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image src={Preview2} alt="chat image" className="h-full w-full" />
                </motion.div>

            </div>
        </div>
    )
}

export default Preview;