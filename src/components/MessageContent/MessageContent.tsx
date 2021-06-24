import React from "react";

// utils
import { getDaysDiffBetweenDates } from "../../utils/helper";

// types
import { iMessage } from "../../types/message.types";

// images
import defaultAvatar from "../../static/images/default.png";

// styles
import classes from "./messageContent.module.css";
import { SRLWrapper } from "simple-react-lightbox";

interface Props {
    data: iMessage;
}

const MessageContent = ({ data }: Props) => {
    const today = new Date();
    const messageDate = new Date(data.createdAt);

    const diff = getDaysDiffBetweenDates(today, messageDate);
    const time = messageDate.toLocaleTimeString("en-US");

    let date = messageDate.toLocaleString().split(",")[0];

    switch (diff) {
        case 1:
            date = "today";
            break;
        case 2:
            date = "yesterday";
            break;
    }

    const fullName = `${data?.author?.firstName} ${data?.author?.lastName}`;

    return (
        <article className={classes.root}>
            <figure>
                <img
                    className={classes.image}
                    src={data?.author?.photo || defaultAvatar}
                    alt={`${fullName}-avatar`}
                />
            </figure>
            <div>
                <div>
                    <span className={classes.name}>{`${fullName} `}</span>
                    <span className={classes.time}>
                        {date} at {time}
                    </span>
                </div>
                <p className={classes.content}>{data.content}</p>
                {data?.file && (
                    <SRLWrapper>
                        <figure>
                            <img
                                className="w-20 h-20"
                                src={data?.file || ""}
                                alt={`${fullName}-message`}
                                onLoad={() => {
                                    console.log("Loaded");
                                }}
                            />
                        </figure>
                    </SRLWrapper>
                )}
            </div>
        </article>
    );
};

export default MessageContent;
