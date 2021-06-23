import { useEffect, useState } from "react";
import { iUser } from "../../types/user.types";

const useChannelSidebar = () => {
    const [members, setMembers] = useState<iUser | null>(null);

    useEffect(() => {

    }, []);

    const getChannel = () => { }

}
export { useChannelSidebar };