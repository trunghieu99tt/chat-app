import React, { useRef, useEffect } from "react";
import SimpleReactLightbox from "simple-react-lightbox";
import { useTranslation } from "react-i18next";

// talons
import { useChat } from "./useChat";

// layout
import ChatLayout from "../../layout/ChatLayout";

// components
import MessageGroup from "../../components/MessageGroup";
import TextMessageForm from "../../components/TextMessageForm";
import ImageMessageForm from "../../components/ImageMessageForm";
import RoomImageGallery from "../../components/RoomImageGallery";

// images
import defaultRoomImage from "../../static/images/default_room.png";

// classes
import classes from "./chat.module.css";
import Spinner from "../../components/Spinner";

const Chat = () => {
    const {
        message,
        loading,
        messages,
        chosenEmoji,
        messageImage,
        channelImages,
        currentChannel,
        onSubmit,
        onChange,
        setChosenEmoji,
        onCloseImageMessageForm,
    } = useChat();

    const messageDiv = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (messageDiv && messageDiv.current) {
            messageDiv.current.scrollTop = messageDiv.current.scrollHeight;
        }
    }, [messages]);

    console.log(`loading`, loading);

    return (
        <React.Fragment>
            {loading && <Spinner />}
            <section className={classes.root}>
                <header className={classes.header}>
                    <div className={classes.headerInner}>
                        <figure className={classes.roomImage}>
                            <img
                                src={currentChannel?.image || defaultRoomImage}
                                alt={`${currentChannel?.name}-wallpaper`}
                            />
                        </figure>
                        <h2 className={classes.roomName}>
                            {currentChannel?.name}
                        </h2>
                    </div>
                </header>
                <main className={classes.main}>
                    <div className={classes.content}>
                        {messageImage.url && (
                            <ImageMessageForm
                                data={messageImage}
                                onCancel={onCloseImageMessageForm}
                                onChange={onChange}
                                onSubmit={onSubmit}
                            />
                        )}

                        <section
                            className={classes.messageContainer}
                            ref={messageDiv}
                        >
                            {messages &&
                                Object.entries(messages).map(([key, value]) => {
                                    return (
                                        <MessageGroup
                                            day={key}
                                            messages={value}
                                            key={`messageGroup-${key}`}
                                        />
                                    );
                                })}
                        </section>

                        <TextMessageForm
                            onChange={onChange}
                            onSubmit={onSubmit}
                            chosenEmoji={chosenEmoji}
                            setChosenEmoji={setChosenEmoji}
                            value={message}
                        />
                    </div>

                    <SimpleReactLightbox>
                        <RoomImageGallery images={channelImages} />
                    </SimpleReactLightbox>
                </main>
            </section>
        </React.Fragment>
    );
};

export default ChatLayout(Chat);
