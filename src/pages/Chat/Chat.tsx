import React, { useRef, useEffect } from "react";

// talons
import { useChat } from "./useChat";

// layout
import ChatLayout from "../../layout/ChatLayout";

// components
import MessageGroup from "../../components/MessageGroup";
import TextMessageForm from "../../components/TextMessageForm";
import ImageMessageForm from "../../components/ImageMessageForm";

// classes
import classes from "./chat.module.css";

const Chat = () => {
    const {
        message,
        messages,
        currentChannel,
        messageImage,
        onSubmit,
        onChange,
        onCloseImageMessageForm,
    } = useChat();

    const messageDiv = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (messageDiv && messageDiv.current) {
            messageDiv.current.scrollTop = messageDiv.current.scrollHeight;
        }
    }, [messages]);

    return (
        <section className={classes.root}>
            <header className={classes.header}>
                <div className={classes.headerInner}>
                    <figure className={classes.roomImage}>
                        <img
                            src={currentChannel?.image}
                            alt={`${currentChannel?.name}-wallpaper`}
                        />
                    </figure>
                    <h2 className={classes.roomName}>{currentChannel?.name}</h2>
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
                                    <MessageGroup day={key} messages={value} />
                                );
                            })}
                    </section>

                    <TextMessageForm
                        onChange={onChange}
                        onSubmit={onSubmit}
                        value={message}
                    />
                </div>
            </main>
        </section>
    );
};

export default ChatLayout(Chat);