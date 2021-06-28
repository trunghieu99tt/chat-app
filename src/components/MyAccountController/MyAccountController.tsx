import React, { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

// talons
import { useAuth } from "../../talons/Auth/useAuth";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

// icons
import { BsFillCaretDownFill } from "react-icons/bs";
import { RiLogoutBoxRLine, RiAccountCircleFill } from "react-icons/ri";
import { MdSupervisorAccount } from "react-icons/md";

// images
import DefaultAvatar from "../../static/images/default.png";

// states
import { fullNameSelector, userState } from "../../states/user.state";
import { useTranslation } from "react-i18next";

const MyAccountController = () => {
    const { t } = useTranslation();

    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);

    const myAccountControllerRef =
        useRef() as React.MutableRefObject<HTMLDivElement>;

    const user = useRecoilValue(userState);
    const fullName = useRecoilValue(fullNameSelector);

    const { handleLogout } = useAuth({});

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    useOnClickOutside(myAccountControllerRef, () => setVisibleDropdown(false));

    return (
        <div className="relative" ref={myAccountControllerRef}>
            <figure className="flex items-center gap-2">
                <img
                    src={user?.photo || DefaultAvatar}
                    alt={fullName}
                    className="w-8 h-8"
                />
                <figcaption className="text-xs font-bold text-white">
                    {fullName}
                </figcaption>
                <button
                    className="outline-none focus:outline-none text-white"
                    onClick={toggleDropdown}
                >
                    <BsFillCaretDownFill />
                </button>
            </figure>

            <AnimatePresence>
                {visibleDropdown && (
                    <motion.div
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
                        className="absolute mt-2 w-full border border-mGray1 rounded-xl px-3 py-4 shadow bg-white"
                    >
                        <ul>
                            <li className="dropdownItem">
                                <Link to="/my-profile">
                                    <RiAccountCircleFill></RiAccountCircleFill>
                                    <p>{t("account.profile")}</p>
                                </Link>
                            </li>
                            <li className="dropdownItem">
                                <Link to="/">
                                    <MdSupervisorAccount></MdSupervisorAccount>
                                    <p>{t("account.groupChat")}</p>
                                </Link>
                            </li>
                            <li className="dropdownItem" onClick={handleLogout}>
                                <button onClick={handleLogout}>
                                    <RiLogoutBoxRLine></RiLogoutBoxRLine>
                                    <p>{t("button.logout")}</p>
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyAccountController;
