import { DialogContent, DialogClose } from "@/src/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"


const SettingDialog = () => {

    return (
        <DialogContent>
            <Tabs defaultValue="account detail" className="w-full">
                <TabsList className="h-auto w-full p-[0.5rem] grid grid-cols-2 rounded-[0.5rem]">
                    <TabsTrigger value="account detail" className="text-[1.25rem] rounded-[0.5rem]">Account Detail</TabsTrigger>
                    <TabsTrigger value="change detail" className="text-[1.25rem] rounded-[0.5rem]">Change Detail</TabsTrigger>
                </TabsList>

                {/* tab content for account detail */}
                <TabsContent value="account detail">
                    <div className="flex flex-col items-center gap-[2rem]">
                        <div className="h-[10rem] w-[10rem] mt-[1rem] rounded-full bg-gray-200"></div>

                        <div className="w-full flex flex-col gap-[1rem]">
                            <div>
                                <label className="text-[1.25rem] block text-gray-700 font-bold mb-2">Name</label>
                                <p className="w-full p-[0.75rem] bg-gray-100 rounded-[0.5rem] text-gray-700 leading-tight text-[1.25rem]">Yogendra Rana</p>
                            </div>
                            <div>
                                <label className="text-[1.25rem] block text-gray-700 font-bold mb-2">Email</label>
                                <p className="w-full p-[0.75rem] bg-gray-100 rounded-[0.5rem] text-gray-700 leading-tight text-[1.25rem]">yogendrarana4321@gmail.com</p>
                            </div>
                            <div>
                                <label className="text-[1.25rem] block text-gray-700 font-bold">Password</label>
                                <p className="w-full p-[0.75rem] bg-gray-100 rounded-[0.5rem] text-gray-700 leading-tight text-[1.25rem]">Password</p>
                            </div>

                            <DialogClose asChild>
                                <button type="button" className="p-[1rem] rounded-[0.5rem] bg-black text-white leading-tight text-[1.25rem] duration-200">
                                    Close
                                </button>
                            </DialogClose>
                        </div>
                    </div>
                </TabsContent>

                {/* tab content for change detail */}
                <TabsContent value="change detail">
                    {/* change detail */}
                    <div className="flex flex-col items-center gap-[2rem]">
                        <div className="h-[10rem] w-[10rem] mt-[1rem] rounded-full bg-gray-200"></div>

                        <div className="w-full flex flex-col gap-[1rem]">
                            <div>
                                <label htmlFor="name" className="text-[1.25rem] block text-gray-700 font-bold mb-2">New Name</label>
                                <input type="text" id="name" className="w-full p-[0.75rem] border rounded-[0.5rem] text-gray-700 leading-tight text-[1.25rem]" placeholder="Enter your name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-[1.25rem] block text-gray-700 font-bold mb-2">New Email</label>
                                <input type="email" id="email" className="w-full p-[0.75rem] border rounded-[0.5rem] text-gray-700 leading-tight text-[1.25rem]" placeholder="Enter your name" />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-[1.25rem] block text-gray-700 font-bold">New Password</label>
                                <input type="password" id="password" autoComplete="new-password" className="w-full p-[0.75rem] border rounded-[0.5rem] text-gray-700 leading-tight text-[1.25rem]" placeholder="Enter your name" />
                            </div>
                            <div>
                                <label htmlFor="c_password" className="text-[1.25rem] block text-gray-700 font-bold">Confirm Password</label>
                                <input type="c_password" id="c_password" autoComplete="new-password" className="w-full p-[0.75rem] border rounded-[0.5rem] text-gray-700 leading-tight text-[1.25rem]" placeholder="Enter your name" />
                            </div>

                            <div className="flex gap-[0.75rem]">
                                <DialogClose asChild>
                                    <button type="button" className="flex-1 p-[1rem] rounded-[0.5rem] bg-black text-white leading-tight text-[1.25rem] duration-200">
                                        Cancel
                                    </button>
                                </DialogClose>

                                <button type="button" className="flex-1 p-[1rem] rounded-[0.5rem] bg-black text-white leading-tight text-[1.25rem] duration-200">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </DialogContent>
    )
}

export default SettingDialog;