import { useMemo } from "react";
import { useSession } from "next-auth/react";

// import types
import { FullChatType } from "../types/types";

const useOtherUser = (chat: FullChatType | null | undefined) => {
    const session = useSession();

    const otherUser = useMemo(() => {
        if (!session.data?.user?.email || !chat || chat.members.length < 2) {
            return null;
        }

        const currentUserEmail = session.data?.user?.email;
        const otherUser = chat.members.filter(({ user }) => user.email !== currentUserEmail);

        return otherUser[0];
    }, [session.data?.user?.email, chat]);

    return otherUser;
};

export default useOtherUser;