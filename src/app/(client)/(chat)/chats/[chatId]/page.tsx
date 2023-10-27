import { useParams } from "next/navigation"

interface IParams {
    chatId: string;
}

const ChatID = ({ params }: { params: IParams }) => {
    return (
        <div className="h-full w-full flex flex-col border-4">
            {params.chatId}
        </div>
    )
}

export default ChatID