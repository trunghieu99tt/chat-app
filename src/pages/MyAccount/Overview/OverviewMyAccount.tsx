import React, { useEffect } from "react";

// libs
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";

// layout
import MyAccountLayout from "../../../layout/MyAccount/MyAccount.layout";

// images
import DefaultAvatar from "../../../static/images/default.png";

// states
import { fullNameSelector, userState } from "../../../states/user.state";
import { useTranslation } from "react-i18next";

const OverviewMyAccount = () => {
    const user = useRecoilValue(userState);
    const fullName = useRecoilValue(fullNameSelector);

    const { t } = useTranslation();

    useEffect(() => {
        if (user?.isThirdParty === true) {
            toast.info(
                `You're logging with social account. 
                Set up username/password to login with username/password! 
                Go to Edit!`
            );
        }
    }, []);

    return (
        <section className="flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl mb-2">{t("account.personalInfo")}</h2>
            <h3 className="text-lg mb-12 font-light">
                {t("account.personalInfoSub")}
            </h3>
            <div className="border-none border-mGray1 rounded-xl sm:w-full sm:mx-2 md:w-3/4 md:border-solid md:border-mGray1 md:border lg:w-1/2 ">
                <header className="px-12 py-7 flex justify-between">
                    <div>
                        <h4 className="text-2xl">{t("account.profile")}</h4>
                        <p className="text-mGray1 font-medium">
                            Some info may be visible to other people
                        </p>
                    </div>
                    <Link
                        to="/my-profile/edit"
                        className="border rounded-xl border-mGray1 py-2 px-8 flex items-center"
                    >
                        {t("button.editAccount")}
                    </Link>
                </header>
                <ul>
                    <li className="overviewMyAccount-listItem ">
                        <p className="overviewMyAccount-listItem__name">
                            {t("account.photo")}
                        </p>
                        <figure>
                            <img
                                src={user?.photo || DefaultAvatar}
                                alt={fullName}
                                className="w-17 h-17 object-cover rounded-lg"
                            />
                        </figure>
                    </li>
                    <li className="overviewMyAccount-listItem">
                        <p className="overviewMyAccount-listItem__name">
                            {t("account.name")}
                        </p>
                        <p>{fullName}</p>
                    </li>
                    <li className="overviewMyAccount-listItem ">
                        <p className="overviewMyAccount-listItem__name">
                            {t("account.bio")}
                        </p>
                        <p>{user?.bio}</p>
                    </li>
                    <li className="overviewMyAccount-listItem ">
                        <p className="overviewMyAccount-listItem__name">
                            {t("account.phone")}
                        </p>
                        <p>{user?.phone}</p>
                    </li>
                    <li className="overviewMyAccount-listItem ">
                        <p className="overviewMyAccount-listItem__name">
                            {t("account.email")}
                        </p>
                        <p>{user?.email}</p>
                    </li>
                    <li className="overviewMyAccount-listItem ">
                        <p className="overviewMyAccount-listItem__name">
                            {t("account.password")}
                        </p>
                        <p>*******</p>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default MyAccountLayout(OverviewMyAccount);
