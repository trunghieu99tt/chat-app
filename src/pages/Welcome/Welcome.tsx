import React from "react";
import ChatLayout from "../../layout/ChatLayout/Chat.layout";

import classes from "./welcome.module.css";

const Welcome = () => {
    return (
        <section className={classes.root}>
            <h2 className={classes.heading}>Welcome to my chat app</h2>
        </section>
    );
};

export default ChatLayout(Welcome);
