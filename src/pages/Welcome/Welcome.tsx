import React from "react";

// layout
import ChatLayout from "../../layout/ChatLayout/Chat.layout";

// images
import BackgroundImage from "../../static/images/bg.jpg";

// styles
import classes from "./welcome.module.css";

const Welcome = () => {
    return (
        <section className={classes.root}>
            <h2 className={classes.heading}>Welcome to my chat app</h2>
            <p className={classes.sub}>Join a room to start chatting!</p>
            <img
                src={BackgroundImage}
                alt="background"
                className={classes.image}
            />
        </section>
    );
};

export default ChatLayout(Welcome);
