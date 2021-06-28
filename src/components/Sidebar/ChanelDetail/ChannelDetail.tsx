import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

// talons
import { useChannelDetail } from "./useChannelDetail";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

// components
import ChannelForm from "../../ChannelForm";

// icons
import { AiOutlineLeft, AiOutlineEdit } from "react-icons/ai";
import { FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { MdDelete, MdExitToApp } from "react-icons/md";
import { HiStatusOnline, HiOutlineStatusOffline } from "react-icons/hi";

// images
import DefaultAvatar from "../../../static/images/default.png";

// types
import { iUser } from "../../../types/user.types";

// styles
import classes from "./channelDetail.module.css";
import Tag from "../../Tag";

const ChannelDetail = () => {
    const {
        visibleDropdown,
        visibleEdit,
        onlineMembers,
        offlineMembers,
        currentChannel,
        visibleMembers,
        isCurrentUserOwner,

        closeEdit,
        openEdit,
        hideDropdown,
        toggleDropdown,
        toggleVisibleMember,
    } = useChannelDetail();

    const { t } = useTranslation();

    const dropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    useOnClickOutside(dropdownRef, () => hideDropdown());

    return (
        <React.Fragment>
            <AnimatePresence>
                {visibleEdit && (
                    <ChannelForm
                        closeForm={closeEdit}
                        channel={currentChannel}
                    />
                )}
            </AnimatePresence>
            <section className={classes.root}>
                <header className={classes.header}>
                    <Link
                        to="/"
                        className="flex items-center gap-5 text-white pb-4 font-bold"
                    >
                        <AiOutlineLeft />
                        <p>{t("allRoom")}</p>
                    </Link>
                </header>
                <div className={classes.detail}>
                    {currentChannel?.image && (
                        <figure className={classes.channelImage}>
                            <img
                                src={currentChannel.image}
                                alt={currentChannel.name}
                            />
                        </figure>
                    )}

                    <div className={classes.info}>
                        <h4 className={classes.channelName}>
                            {currentChannel?.name}
                        </h4>

                        <AnimatePresence>
                            {visibleDropdown && (
                                <motion.button
                                    onClick={toggleDropdown}
                                    initial={{
                                        opacity: 0,
                                        rotate: 0,
                                    }}
                                    animate={{
                                        rotate: "180deg",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        rotate: 0,
                                    }}
                                    className={classes.toggleDropdown}
                                >
                                    <FiX />
                                </motion.button>
                            )}
                            {!visibleDropdown && (
                                <motion.button
                                    onClick={toggleDropdown}
                                    className={classes.toggleDropdown}
                                >
                                    <FiChevronDown />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* <p className={classes.channelDescription}>
                            {currentChannel?.description}
                        </p> */}
                    </div>

                    <AnimatePresence>
                        {visibleDropdown && (
                            <motion.section
                                ref={dropdownRef}
                                className={classes.dropdown}
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    transformOrigin: "top right",
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0,
                                }}
                            >
                                {isCurrentUserOwner && (
                                    <button
                                        title={t("button.editRoom")}
                                        className={classes.dropdownItem}
                                        onClick={openEdit}
                                    >
                                        <span>{t("button.editRoom")}</span>
                                        <AiOutlineEdit />
                                    </button>
                                )}
                                {(isCurrentUserOwner && (
                                    <button
                                        className={classNames(
                                            classes.dropdownItem,
                                            classes.danger
                                        )}
                                    >
                                        <span>{t("button.deleteRoom")}</span>
                                        <MdDelete />
                                    </button>
                                )) || (
                                    <button
                                        className={classNames(
                                            classes.dropdownItem,
                                            classes.danger
                                        )}
                                    >
                                        <span>{t("button.leaveRoom")}</span>
                                        <MdExitToApp />
                                    </button>
                                )}
                            </motion.section>
                        )}
                    </AnimatePresence>
                </div>

                <AnimateSharedLayout>
                    {[onlineMembers, offlineMembers].map(
                        (members: iUser[], idx: number) => {
                            if (members.length) {
                                const heading = `${
                                    idx === 0 ? "Online" : "Offline"
                                } - ${members.length}`;

                                return (
                                    <motion.div
                                        layout
                                        className={classes.memberContainer}
                                        key={heading}
                                    >
                                        <button
                                            className={classes.memberHeading}
                                            onClick={() =>
                                                toggleVisibleMember(idx)
                                            }
                                        >
                                            {(visibleMembers[idx] && (
                                                <FiChevronDown />
                                            )) || <FiChevronRight />}

                                            {idx === 0 ? (
                                                <HiStatusOnline />
                                            ) : (
                                                <HiOutlineStatusOffline />
                                            )}
                                            {heading}
                                        </button>
                                        <AnimatePresence>
                                            {visibleMembers[idx] && (
                                                <motion.ul
                                                    className={
                                                        classes.memberList
                                                    }
                                                    layout
                                                    initial={{
                                                        opacity: 0,
                                                        maxHeight: 0,
                                                        overflow: "hidden",
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        maxHeight: 200,
                                                        overflow: "auto",
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        maxHeight: 0,
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {members?.map(
                                                        (member: iUser) => {
                                                            const fullName =
                                                                member?.firstName +
                                                                " " +
                                                                member?.lastName;

                                                            return (
                                                                <li
                                                                    className={
                                                                        classes.member
                                                                    }
                                                                    key={`members-${idx}-${member._id}`}
                                                                >
                                                                    {currentChannel
                                                                        ?.owner
                                                                        .username ===
                                                                        member?.username && (
                                                                        <Tag
                                                                            text={t(
                                                                                "tag.owner"
                                                                            )}
                                                                        />
                                                                    )}

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
                                                                            {
                                                                                fullName
                                                                            }
                                                                        </figcaption>
                                                                    </figure>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            }
                            return null;
                        }
                    )}
                </AnimateSharedLayout>
            </section>
        </React.Fragment>
    );
};

export default ChannelDetail;
