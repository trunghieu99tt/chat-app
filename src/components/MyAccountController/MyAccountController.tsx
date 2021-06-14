import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router";

// icons
import { BsFillCaretDownFill } from "react-icons/bs";
import { RiLogoutBoxRLine, RiAccountCircleFill } from "react-icons/ri";
import { MdSupervisorAccount } from "react-icons/md";

// states
import { fullNameSelector, userState } from "../../states/user.state";

const MyAccountController = () => {
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);

    const [user, setUser] = useRecoilState(userState);
    const fullName = useRecoilValue(fullNameSelector);
    const history = useHistory();

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    const onLogout = () => {
        localStorage.setItem("accessToken", "");
        setUser(null);
        history.push("/login");
    };

    return (
        <div className="relative">
            <figure className="flex items-center gap-2">
                <img src={user?.photo} alt={fullName} className="w-8 h-8" />
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
                        <li className="dropdownItem" onClick={onLogout}>
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
