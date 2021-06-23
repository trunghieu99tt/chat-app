import React from "react";
import { iMessage } from "../../types/message.types";

// utils
import mergeClasses from "../../utils/mergeClasses";

// components
import MessageContent from "../MessageContent";

// styles
import defaultClasses from "./messagegroup.module.css";

interface Props {
    classes?: object;
    day: string;
    messages: iMessage[];
}

const MessageGroup = ({ classes: propsClasses, day, messages }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <p>{day}</p>
            </div>
            <ul className={classes.messageList}>
                {messages &&
                    Array.from(messages).map((message: iMessage) => {
                        return (
                            <MessageContent data={message} key={message._id} />
                        );
                    })}
            </ul>
        </div>
    );
};

export default MessageGroup;
