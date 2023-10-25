import { useParams } from "next/navigation"

interface IParams {
    chatId: string;
}

const ChatID = ({ params }: { params: IParams }) => {
    return (
        <div className="h-full">
            <div className="h-full flex flex-col">
                {params.chatId}
            </div>
        </div>
    )
}

export default ChatID