import React, { useEffect } from "react";

// libs
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";

// layout
import MyAccountLayout from "../../../layout/MyAccount/MyAccount.layout";

// states
import { fullNameSelector, userState } from "../../../states/user.state";

const OverviewMyAccount = () => {
    const user = useRecoilValue(userState);
    const fullName = useRecoilValue(fullNameSelector);

    useEffect(() => {
        if (user?.isThirdParty === true) {
            toast.info(
                "You're logging with google account. Set up username/password to login with username/password! Go to Edit!"
            );
        }
    }, []);

    return (
        <section className="flex flex-col items-center justify-center">
            <h2 className="text-4xl mb-2">Personal info</h2>
            <h3 className="text-lg mb-12 font-light">
                Basic Info, like your name and photo
            </h3>
            <div className="border-none border-mGray1 rounded-xl sm:w-full sm:mx-2 md:w-3/4 md:border-solid md:border-mGray1 md:border lg:w-1/2 ">
                <header className="px-12 py-7 flex justify-between">
                    <div>
                        <h4 className="text-2xl">Profile</h4>
                        <p className="text-mGray1 font-medium">
                            Some info may be visible to other people
                        </p>
                    </div>
                    <Link
                        to="/my-profile/edit"
                        className="border rounded-xl border-mGray1 py-2 px-8 flex items-center"
                    >
                        Edit
                    </Link>
                </header>
                <ul>
                    <li className="overviewMyAccount-listItem ">
                        <p className="overviewMyAccount-listItem__name">
                            Photo
                        </p>
                        <figure>
                            <img
                                src={user?.photo}
                                alt={fullName}
                                className="w-17 h-17 object-cover rounded-lg"
                            />
                        </figure>
                    </li>
                    <li className="overviewMyAccount-listItem">
                        <p className="overviewMyAccount-listItem__name">Name</p>
                        <p>{fullName}</p>
                    </li>
                    <li className="overviewMyAccount-listItem ">
                        <p className="overviewMyAccount-listItem__name">Bio</p>
                        <p>{user?.bio}</p>
                    </li>
                    <li className="overviewMyAccount-listItem ">
                        <p className="overviewMyAccount-listItem__name">
                            Phone
                        </p>
                        <p>{user?.phone}</p>
                    </li>
                    <li className="overviewMyAccount-listItem ">
                        <p className="overviewMyAccount-listItem__name">
                            Email
                        </p>
                        <p>{user?.email}</p>
                    </li>
                    <li className="overviewMyAccount-listItem ">
                        <p className="overviewMyAccount-listItem__name">
                            Password
                        </p>
                        <p>*******</p>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default MyAccountLayout(OverviewMyAccount);
