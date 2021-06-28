import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import cn from "classnames";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// components
import ChannelDetail from "../../../components/Sidebar/ChanelDetail";
import ChannelList from "../../../components/Sidebar/ChannelList";
import ToggleButton from "../../../components/ToggleButton";

// states
import { fullNameSelector, userState } from "../../../states/user.state";
import {
    screenSizeState,
    showLeftSidebarState,
} from "../../../states/app.state";

// types
import { TSidebar } from "../../../types/app.types";

// icons
import { BiLinkExternal } from "react-icons/bi";

// images
import DefaultAvatar from "../../../static/images/default.png";

// styles
import classes from "./sidebar.module.css";

const Sidebar = () => {
    const [screen, setScreen] = useState<TSidebar>("LIST_CHANNEL");
    const [user, setUser] = useRecoilState(userState);
    const fullName = useRecoilValue(fullNameSelector);
    const screenSize = useRecoilValue(screenSizeState);
    const [visibleLeftSidebar, setVisibleLeftSidebar] =
        useRecoilState(showLeftSidebarState);
    const params: any = useParams();

    useEffect(() => {
        if (params?.id) {
            if (screen !== "CHANNEL_DETAIL") {
                setScreen("CHANNEL_DETAIL");
            }
        } else {
            setScreen("LIST_CHANNEL");
        }
    }, [params]);

    return (
        <AnimatePresence>
            {(screenSize === "DESKTOP" || visibleLeftSidebar === true) && (
                <motion.aside
                    className={cn("bg-mGray2 px-5 py-4", classes.root)}
                    initial={{
                        x: "-100%",
                    }}
                    animate={{
                        x: "0",
                    }}
                    exit={{ x: "-100%" }}
                    // transition={{
                    //     values: 0.1,
                    // }}
                >
                    {visibleLeftSidebar && (
                        <motion.div
                            animate={visibleLeftSidebar ? "open" : "closed"}
                        >
                            <ToggleButton
                                classes={{
                                    root: classes.toggleBtn,
                                }}
                                onClick={() =>
                                    setVisibleLeftSidebar((value) => !value)
                                }
                            />
                        </motion.div>
                    )}
                    {screen === "CHANNEL_DETAIL" ? (
                        <ChannelDetail />
                    ) : (
                        <ChannelList />
                    )}
                    <div className={classes.footer}>
                        <figure className="flex gap-4 items-center">
                            <img
                                className="w-10 h-10 object-cover rounded-full"
                                src={user?.photo || DefaultAvatar}
                                alt={`${fullName}-avatar`}
                            />
                            <figcaption className="text-white">
                                {fullName}
                            </figcaption>
                        </figure>
                        <Link to="/my-profile">
                            <BiLinkExternal />
                        </Link>
                    </div>
                </motion.aside>
            )}
            {screenSize !== "DESKTOP" && (
                <React.Fragment>
                    {!visibleLeftSidebar && (
                        <motion.div
                            animate={visibleLeftSidebar ? "open" : "closed"}
                        >
                            <ToggleButton
                                onClick={() =>
                                    setVisibleLeftSidebar((value) => !value)
                                }
                            />
                        </motion.div>
                    )}
                    {visibleLeftSidebar && (
                        <div
                            className={classes.mask}
                            onClick={() => setVisibleLeftSidebar(false)}
                        ></div>
                    )}
                </React.Fragment>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
