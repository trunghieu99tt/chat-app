import React from "react";
import { useEffect } from "react";
import classNames from "classnames";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

// talons
import { useRecoilValue } from "recoil";

// icons
import { AiOutlineLeft } from "react-icons/ai";

// images
import DefaultAvatar from "../../../static/images/default.png";

// state
import { channelState } from "../../../states/room.state";
import { connectedUsersState } from "../../../states/user.state";

// types
import { iChannel } from "../../../types/channel.types";
import { iUser } from "../../../types/user.types";

// styles
import classes from "./channelDetail.module.css";

interface Props {}

const ChannelDetail = (props: Props) => {
    const params: any = useParams();
    const { id } = params;
    const channels = useRecoilValue(channelState);
    const currentChannel = channels?.find((e: iChannel) => e._id === id);
    const onlineUsers = useRecoilValue(connectedUsersState)?.reduce(
        (res: any, user: iUser) => {
            if (user._id) {
                return {
                    ...res,
                    [user._id]: user,
                };
            }
            return {
                ...res,
            };
        },
        {}
    );

    let onlineMembers: iUser[] = [];
    let offlineMembers: iUser[] = [];

    const members = currentChannel?.members || [];

    members.forEach((member: iUser) => {
        if (onlineUsers.hasOwnProperty(member._id)) {
            onlineMembers.push(member);
        } else {
            offlineMembers.push(member);
        }
    });

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
            <div className="mb-5">
                {currentChannel?.image && (
                    <figure className={classes.channelImage}>
                        <img
                            src={currentChannel.image}
                            alt={currentChannel.name}
                        />
                    </figure>
                )}
                <h4 className={classes.channelName}>{currentChannel?.name}</h4>
                <p className={classes.channelDescription}>
                    {currentChannel?.description}
                </p>
            </div>

            <div className="mb-5">
                <h4 className={classes.memberHeading}>
                    Online - {onlineMembers?.length}
                </h4>
                <ul className={classes.memberList}>
                    {onlineMembers?.map((member: iUser) => {
                        const fullName =
                            member?.firstName + " " + member?.lastName;

                        return (
                            <li className={classes.member}>
                                <figure>
                                    <img
                                        src={member?.photo || DefaultAvatar}
                                        alt={`${fullName}-avatar`}
                                        className={classes.memberImage}
                                    />
                                    <p
                                        className={classNames(
                                            classes.dot,
                                            classes.online
                                        )}
                                    ></p>
                                    <figcaption className={classes.memberName}>
                                        {fullName}
                                    </figcaption>
                                </figure>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {offlineMembers?.length > 0 && (
                <div>
                    <h4 className={classes.memberHeading}>
                        Others - {offlineMembers?.length}
                    </h4>
                    <ul className={classes.memberList}>
                        {offlineMembers?.map((member: iUser) => {
                            const fullName =
                                member?.firstName + " " + member?.lastName;

                            return (
                                <li className={classes.member}>
                                    <figure>
                                        <img
                                            src={member?.photo || DefaultAvatar}
                                            alt={`${fullName}-avatar`}
                                            className={classes.memberImage}
                                        />
                                        <p
                                            className={classNames(
                                                classes.dot,
                                                classes.offline
                                            )}
                                        ></p>
                                        <figcaption
                                            className={classes.memberName}
                                        >
                                            {fullName}
                                        </figcaption>
                                    </figure>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </section>
    );
};

export default ChannelDetail;
