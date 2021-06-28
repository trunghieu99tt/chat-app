import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import cn from "classnames";

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

// styles
import classes from "./overviewMyAccount.module.css";

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
        <section className={classes.root}>
            <h2 className={classes.heading}>{t("account.personalInfo")}</h2>
            <h3 className={classes.subHeading}>
                {t("account.personalInfoSub")}
            </h3>
            <div className={classes.main}>
                <header className={classes.mainHeader}>
                    <div className={classes.mainHeaderLeft}>
                        <h4>{t("account.profile")}</h4>
                        <p>Some info may be visible to other people</p>
                    </div>
                    <Link to="/my-profile/edit" className={classes.editBtn}>
                        {t("button.editAccount")}
                    </Link>
                </header>
                <ul>
                    <li
                        className={cn(
                            "overviewMyAccount-listItem",
                            classes.listItem
                        )}
                    >
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
                    <li
                        className={cn(
                            "overviewMyAccount-listItem",
                            classes.listItem
                        )}
                    >
                        <p className="overviewMyAccount-listItem__name">
                            {t("account.name")}
                        </p>
                        <p>{fullName}</p>
                    </li>
                    <li
                        className={cn(
                            "overviewMyAccount-listItem",
                            classes.listItem
                        )}
                    >
                        <p className="overviewMyAccount-listItem__name">
                            {t("account.bio")}
                        </p>
                        <p>{user?.bio}</p>
                    </li>
                    <li
                        className={cn(
                            "overviewMyAccount-listItem",
                            classes.listItem
                        )}
                    >
                        <p className="overviewMyAccount-listItem__name">
                            {t("account.phone")}
                        </p>
                        <p>{user?.phone}</p>
                    </li>
                    <li
                        className={cn(
                            "overviewMyAccount-listItem",
                            classes.listItem
                        )}
                    >
                        <p className="overviewMyAccount-listItem__name">
                            {t("account.email")}
                        </p>
                        <p>{user?.email}</p>
                    </li>
                    <li
                        className={cn(
                            "overviewMyAccount-listItem",
                            classes.listItem
                        )}
                    >
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
