import React from "react";
import { useEffect } from "react";

import { AiOutlineLeft } from "react-icons/ai";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { channelState } from "../../../states/room.state";
import { iChannel } from "../../../types/channel.types";
import { iUser } from "../../../types/user.types";
import { Link } from "react-router-dom";

import classes from "./channelDetail.module.css";

interface Props {}

const ChannelDetail = (props: Props) => {
    const params: any = useParams();

    const { id } = params;

    const channels = useRecoilValue(channelState);

    const currentChannel = channels?.find((e: iChannel) => e._id === id);

    const members = currentChannel?.members || [];

    useEffect(() => {
        // onInit();
    }, []);

    return (
        <section>
            <header>
                <Link
                    to="/"
                    className="flex items-center gap-5 text-white pb-4 font-bold"
                >
                    <AiOutlineLeft />
                    <p>All Channels</p>
                </Link>
            </header>
            <div className="mb-11">
                <h4 className="text-white uppercase mb-4 text-sm font-bold">
                    {currentChannel?.name}
                </h4>
                <p className="text-xs text-white">
                    {currentChannel?.description}
                </p>
            </div>

            <div>
                <h4 className="text-white uppercase mb-6 text-lg font-bold">
                    Members
                </h4>
                <ul className={classes.memberList}>
                    {members?.map((member: iUser) => {
                        const fullName =
                            member?.firstName + " " + member?.lastName;

                        return (
                            <li className={classes.member}>
                                <figure>
                                    <img
                                        src={member?.photo}
                                        alt={`${fullName}-avatar`}
                                        className={classes.memberImage}
                                    />
                                    <figcaption className={classes.memberName}>
                                        {fullName}
                                    </figcaption>
                                </figure>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default ChannelDetail;
