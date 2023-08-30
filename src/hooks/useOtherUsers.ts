import { useMemo } from "react";
import { useSession } from "next-auth/react";

const useOtherUsers = () => {

    const session = useSession();

    const otherUsers = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email;

    }, []);

}

export default useOtherUsers;