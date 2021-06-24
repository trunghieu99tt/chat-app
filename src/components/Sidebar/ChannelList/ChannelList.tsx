import React from "react";
import { AnimateSharedLayout } from "framer-motion";

// talons
import { useChannelList } from "./useChannelList";

// components
import ChannelForm from "../../ChannelForm";
import ChannelListItem from "../../ChannelListItem";

// icons
import { BsSearch, BsPlus } from "react-icons/bs";

// types
import { iChannel } from "../../../types/channel.types";

// styles
import classes from "./channelList.module.css";

interface Props {}

const ChannelList = (props: Props) => {
    const {
        query,
        selected,
        visibleForm,
        channelList,
        openForm,
        closeForm,
        setSelected,
        onChangeSearchInput,
    } = useChannelList();

    return (
        <section>
            {visibleForm && <ChannelForm closeForm={closeForm} />}
            <header className="flex justify-between">
                <p className="text-white text-lg font-bold">Channel</p>
                <button
                    className="bg-mGray5 rounded-lg p-2 text-white outline-none"
                    onClick={openForm}
                >
                    <BsPlus />
                </button>
            </header>
            <div className="flex bg-mGray6 mt-9 mb-9 px-3 py-3 rounded-lg text-white items-center focus:outline-none">
                <BsSearch />
                <input
                    type="text"
                    placeholder="Search"
                    className="input flex-1"
                    value={query}
                    onChange={onChangeSearchInput}
                />
            </div>
            <AnimateSharedLayout>
                <div className={classes.channelList}>
                    {channelList?.map((channel: iChannel, idx: number) => {
                        return (
                            <ChannelListItem
                                data={channel}
                                isSelected={selected === idx}
                                onHover={() => setSelected(idx)}
                                onLeave={() => setSelected(-1)}
                                key={`channelListItem-${channel._id}`}
                            />
                        );
                    })}
                </div>
            </AnimateSharedLayout>
        </section>
    );
};

export default ChannelList;
