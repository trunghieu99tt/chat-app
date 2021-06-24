import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

// talons
import { useChannelDetail } from "./useChannelDetail";

// components
import ChannelForm from "../../ChannelForm";

// icons
import { AiOutlineLeft, AiOutlineEdit } from "react-icons/ai";

// images
import DefaultAvatar from "../../../static/images/default.png";

// types
import { iUser } from "../../../types/user.types";

// styles
import classes from "./channelDetail.module.css";

const ChannelDetail = () => {
    const {
        visibleEdit,
        onlineMembers,
        offlineMembers,
        currentChannel,
        isCurrentUserOwner,
        closeEdit,
        openEdit,
    } = useChannelDetail();

    return (
        <React.Fragment>
            {visibleEdit && (
                <ChannelForm closeForm={closeEdit} channel={currentChannel} />
            )}
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
                    <h4 className={classes.channelName}>
                        {currentChannel?.name}
                    </h4>
                    <p className={classes.channelDescription}>
                        {currentChannel?.description}
                    </p>

                    {isCurrentUserOwner && (
                        <button
                            title="Edit channel"
                            className={classes.editBtn}
                            onClick={openEdit}
                        >
                            <AiOutlineEdit />
                        </button>
                    )}
                </div>

                {[onlineMembers, offlineMembers].map(
                    (members: iUser[], idx: number) => {
                        if (members.length) {
                            const heading = `${
                                idx === 0 ? "Online" : "Offline"
                            } - ${members.length}`;

                            return (
                                <div
                                    className={classes.memberContainer}
                                    key={heading}
                                >
                                    <h4 className={classes.memberHeading}>
                                        {heading}
                                    </h4>
                                    <ul className={classes.memberList}>
                                        {members?.map((member: iUser) => {
                                            const fullName =
                                                member?.firstName +
                                                " " +
                                                member?.lastName;

                                            return (
                                                <li
                                                    className={classes.member}
                                                    key={`members-${idx}-${member._id}`}
                                                >
                                                    <figure>
                                                        <img
                                                            src={
                                                                member?.photo ||
                                                                DefaultAvatar
                                                            }
                                                            alt={`${fullName}-avatar`}
                                                            className={
                                                                classes.memberImage
                                                            }
                                                        />
                                                        <p
                                                            className={classNames(
                                                                classes.dot,
                                                                {
                                                                    [classes.online]:
                                                                        idx ===
                                                                        0,
                                                                    [classes.offline]:
                                                                        idx ===
                                                                        1,
                                                                }
                                                            )}
                                                        ></p>
                                                        <figcaption
                                                            className={
                                                                classes.memberName
                                                            }
                                                        >
                                                            {fullName}
                                                        </figcaption>
                                                    </figure>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        }

                        return null;
                    }
                )}
            </section>
        </React.Fragment>
    );
};

export default ChannelDetail;
