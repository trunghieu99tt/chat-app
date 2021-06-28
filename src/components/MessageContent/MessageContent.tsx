import React from "react";
import { SRLWrapper } from "simple-react-lightbox";

// utils
import { urlify } from "../../utils/helper";

// types
import { iMessage } from "../../types/message.types";

// images
import defaultAvatar from "../../static/images/default.png";

// styles
import classes from "./messageContent.module.css";
import VoiceMessageContent from "../VoiceMessageContent";
import { useTranslation } from "react-i18next";

interface Props {
    data: iMessage;
}

const MessageContent = ({ data }: Props) => {
    const { t } = useTranslation();

    const messageDate = new Date(data.createdAt);
    const time = messageDate.toLocaleTimeString("en-US");
    let date = messageDate.toLocaleString().split(",")[0];
    const fullName = `${data?.author?.firstName} ${data?.author?.lastName}`;
    let fileContent = null;

    if (data.file) {
        if (
            process.env.REACT_APP_FIREBASE_PROJECTID &&
            data.file.includes(process.env.REACT_APP_FIREBASE_PROJECTID)
        ) {
            fileContent = <VoiceMessageContent url={data.file} />;
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
                        {date} {t("at")} {time}
                    </span>
                </div>
                <p
                    className={classes.content}
                    dangerouslySetInnerHTML={{ __html: urlify(data.content) }}
                ></p>
                {data?.file && <SRLWrapper>{fileContent}</SRLWrapper>}
            </div>
        </article>
    );
};

export default MessageContent;
