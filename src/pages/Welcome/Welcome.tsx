import React from "react";
import { useTranslation } from "react-i18next";

// layout
import ChatLayout from "../../layout/ChatLayout/Chat.layout";

// images
import BackgroundImage from "../../static/images/bg.jpg";

// styles
import classes from "./welcome.module.css";

const Welcome = () => {
    const { t } = useTranslation();

    return (
        <section className={classes.root}>
            <h2 className={classes.heading}>{t("welcome")}</h2>
            <p className={classes.sub}>{t("subWelcome")}</p>
            <img
                src={BackgroundImage}
                alt="background"
                className={classes.image}
            />
        </section>
    );
};

export default ChatLayout(Welcome);
