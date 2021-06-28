import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { showChannelFormState } from "../../../states/app.state";
import { channelState } from "../../../states/room.state";
import { iChannel } from "../../../types/channel.types";

const useChannelList = () => {
    const channels = useRecoilValue(channelState);
    const [isVisibleChannelForm, setShowChannelForm] = useRecoilState(showChannelFormState);

    const [query, setQuery] = useState<string>("");
    const [channelList, setChannelList] = useState<iChannel[]>(channels || []);
    const [selected, setSelected] = useState<number>(0);

    useEffect(() => {
        if (channels) {
            setChannelList(channels);
        }
    }, [channels])

    const openForm = () => {
        setShowChannelForm(true);
    }




    const onChangeSearchInput = (event: any) => {
        setQuery(event.target.value);
        const filteredChannels = channels?.filter((channel: iChannel) => {
            return channel.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase());
        }) || [];
        setChannelList(filteredChannels);
    }

    return {
        query,
        selected,
        channelList,
        openForm,
        setSelected,
        onChangeSearchInput
    }

}

export { useChannelList };