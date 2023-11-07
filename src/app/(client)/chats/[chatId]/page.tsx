import React from "react";

// import components
import FeedBody from "./components/FeedBody";
import FeedFooter from "./components/FeedFooter";
import FeedHeader from "./components/FeedHeader";

// import actions
import getChatById from "@/src/actions/getChatById";
import getChatMessages from "@/src/actions/getChatMessages";

interface IParams {
    chatId: string;
}

const ChatID = async ({ params }: { params: IParams }) => {
    const chat = await getChatById(parseInt(params.chatId));
    const messages = await getChatMessages(parseInt(params.chatId));

    return (
        <div className=" h-[100vh] px-[1rem] flex-1 flex flex-col border-l pl-[1rem]" >
            <FeedHeader chat={chat} />
            <FeedBody messages={messages} />
            <FeedFooter />
        </div>
    )
}

export default ChatID