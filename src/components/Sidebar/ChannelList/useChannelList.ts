import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { channelState } from "../../../states/room.state";
import { iChannel } from "../../../types/channel.types";

const useChannelList = () => {
    const channels = useRecoilValue(channelState);

    const [visibleForm, setVisibleForm] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [channelList, setChannelList] = useState<iChannel[]>(channels || []);
    const [selected, setSelected] = useState<number>(0);

    useEffect(() => {
        console.log(`channels`, channels);
        if (channels) {
            setChannelList(channels);
        }
    }, [channels])

    const openForm = () => setVisibleForm(true);

    const closeForm = () => setVisibleForm(false);

    const onChangeSearchInput = (event: any) => {
        setQuery(event.target.value);
        const filteredChannels = channels?.filter((channel: iChannel) => {
            return channel.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase());
        }) || [];
        setChannelList(filteredChannels);
    }

    useEffect(() => {
    }, []);

    return {
        query,
        selected,
        channelList,
        visibleForm,
        openForm,
        closeForm,
        setSelected,
        onChangeSearchInput
    }

}

export { useChannelList };