import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";

// layout
import ChatLayout from "../../layout/ChatLayout/Chat.layout";

// components
import LangSelector from "../../components/LangSelector";

// images
import BackgroundImage from "../../static/images/bg.jpg";

// styles
import classes from "./welcome.module.css";

const Welcome = () => {
    const { t } = useTranslation();

    return (
        <section className={classes.root}>
            <LangSelector />
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
