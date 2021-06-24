import React from "react";
import ReactPlayer from "react-player";

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

    let fileContent = null;

    if (data.file) {
        if (
            process.env.REACT_APP_FIREBASE_PROJECTID &&
            data.file.includes(process.env.REACT_APP_FIREBASE_PROJECTID)
        ) {
            fileContent = (
                <video controls>
                    <source src={data.file} type="audio/webm" />
                </video>
            );
        } else {
            fileContent = (
                <figure>
                    <img
                        className="w-60 h-60 object-cover"
                        src={data?.file || ""}
                        alt={`${fullName}-message`}
                        onLoad={() => {
                            console.log("Loaded");
                        }}
                    />
                </figure>
            );
        }
    }

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
                {data?.file && <SRLWrapper>{fileContent}</SRLWrapper>}
            </div>
        </article>
    );
};

export default MessageContent;
