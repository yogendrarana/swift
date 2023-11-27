import { Channel } from "pusher-js";
import { useEffect, useState } from "react";
import { pusherClient } from "../pusher/pusher";

// import hooks
import useActiveUsers from "./useActiveUsers";

const useActiveChannel = () => {
    const { set, add, remove} = useActiveUsers();
    const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

    useEffect(() => {
        let channel = activeChannel;

        if (!channel) {
            channel = pusherClient.subscribe("presence-messenger");
            setActiveChannel(channel);

            channel.bind("pusher:subscription_succeeded", (members: Record<string, any>) => {
                const initialUsers: string[] = [];
                members.each((member: Record<string, any>) => {
                    initialUsers.push(member.id);
                });

                set(initialUsers);
            });

            channel.bind("pusher:member_added", (member: Record<string, any>) => {
                add(member.id);
            });

            channel.bind("pusher:member_removed", (member: Record<string, any>) => {
                remove(member.id);
            });

            return () => {
                if (activeChannel) {
                    pusherClient.unsubscribe("presence-messenger");
                    setActiveChannel(null);
                }
            }
        }
    }, [activeChannel, add, remove, set]);
}

export default useActiveChannel;