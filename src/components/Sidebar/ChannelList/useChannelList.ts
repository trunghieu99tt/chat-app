import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { channelState } from "../../../states/room.state";
import { iChannel } from "../../../types/channel.types";

const useChannelList = () => {
    const channelList = useRecoilValue(channelState);

    const [visibleForm, setVisibleForm] = useState<boolean>(false);

    const openForm = () => setVisibleForm(true);

    const closeForm = () => setVisibleForm(false);

    useEffect(() => {
    }, []);

    return {
        channelList,
        visibleForm,
        openForm,
        closeForm
    }

}

export { useChannelList };