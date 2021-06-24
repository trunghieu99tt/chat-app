import React, { useState } from "react";
import { useRecoilValue } from "recoil";

// talons
import { useAuth } from "../../talons/Auth/useAuth";

// icons
import { BsFillCaretDownFill } from "react-icons/bs";
import { RiLogoutBoxRLine, RiAccountCircleFill } from "react-icons/ri";
import { MdSupervisorAccount } from "react-icons/md";

// images
import DefaultAvatar from "../../static/images/default.png";

// states
import { fullNameSelector, userState } from "../../states/user.state";

const MyAccountController = () => {
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);

    const user = useRecoilValue(userState);
    const fullName = useRecoilValue(fullNameSelector);

    const { handleLogout } = useAuth({});

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    return (
        <div className="relative">
            <figure className="flex items-center gap-2">
                <img
                    src={user?.photo || DefaultAvatar}
                    alt={fullName}
                    className="w-8 h-8"
                />
                <figcaption className="text-xs font-bold">
                    {fullName}
                </figcaption>
                <button
                    className="outline-none focus:outline-none"
                    onClick={toggleDropdown}
                >
                    <BsFillCaretDownFill />
                </button>
            </figure>

            {visibleDropdown && (
                <div className="absolute mt-2 w-full border border-mGray1 rounded-xl px-3 py-4 shadow bg-white">
                    <ul>
                        <li className="dropdownItem">
                            <RiAccountCircleFill></RiAccountCircleFill>
                            <p>My Profile</p>
                        </li>
                        <li className="dropdownItem">
                            <MdSupervisorAccount></MdSupervisorAccount>
                            <p>Group Chat</p>
                        </li>
                        <li className="dropdownItem" onClick={handleLogout}>
                            <RiLogoutBoxRLine></RiLogoutBoxRLine>
                            <p>Logout</p>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyAccountController;
