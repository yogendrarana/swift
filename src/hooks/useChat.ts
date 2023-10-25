import { useMemo } from "react";
import { useParams } from "next/navigation";

const useChat = () => {
    const params = useParams();

    const chatId = useMemo(() => {
        if (!params?.chatId) {
            return '';
        }

        return params.chatId as string;
    }, [params?.chatId]);

    const isChatOpen = useMemo(() => !!chatId, [chatId]);

    return useMemo(() => ({
        isChatOpen,
        chatId
    }), [isChatOpen, chatId]);
};

export default useChat;