import { getServerSession } from "next-auth";
import { pusherServer } from "@/pusher/pusher";
import { authOptions } from "@/utils/authOptions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        res.status(401);
    }

    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const channelData = {
        user_id: session?.user?.email!,
    }

    const auth = pusherServer.authorizeChannel(socketId, channel, channelData);

    return res.send(auth);
}
