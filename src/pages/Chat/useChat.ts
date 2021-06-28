import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { channelState } from "../../states/room.state";
import { useSocket } from "../../talons/Socket/useSocket";
import { iChannel } from "../../types/channel.types";
import { iMessage } from "../../types/message.types";
import client from "../../api/client";
import { userState } from "../../states/user.state";
import { iUser } from "../../types/user.types";

const useChat = () => {
    const channels = useRecoilValue(channelState);
    const currentUser = useRecoilValue(userState);
    const params: any = useParams();
    const { addMessage, joinRoom } = useSocket();
    const { id } = params;

    const [messages, setMessages] = useState<{ [key: string]: iMessage[] } | null>(null);
    const [message, setMessage] = useState<string>('');
    const [chosenEmoji, setChosenEmoji] = useState<any>(null);
    const [messageImage, setMessageImage] = useState<{
        file: File | null,
        url: string,
    }>({
        file: null,
        url: ""
    })

    const currentChannel = channels?.find((e: iChannel) => e._id === id);

    let channelImages: string[] = [];

    currentChannel?.messages.forEach((message: iMessage) => {
        const isImage = message.file && message.file.endsWith('jpg');
        if (isImage && message.file) {
            channelImages.push(message.file);
        }
    })

    useEffect(() => {
        return () => {
            joinChannel();
        }
    }, []);

    useEffect(() => {
        if (currentChannel) {
            getMessages();
            joinChannel();
        }
    }, [id]);

    useEffect(() => {
        if (currentChannel) {
            getMessages();
        }
    }, [channels])

    useEffect(() => {
        if (chosenEmoji) {
            const newMessage = `${message} ${chosenEmoji!.emoji}`;
            setMessage(newMessage);
            setChosenEmoji(null);
        }
    }, [chosenEmoji]);



    const onSubmit = async (event: any) => {
        event.preventDefault();
        if (!messageImage.file) {
            if (message.length > 0) {
                addMessage(message, id);
                setMessage('');
            }
        }
        else {
            const formData = new FormData();
            formData.append('image', messageImage.file);
            const response = await client.post('upload/image', formData);
            let imageUrl = null;
            if (response.status === 201) {
                imageUrl = response.data;
            }
            addMessage(message, id, imageUrl);
            onCloseImageMessageForm();
        }
    }

    const onChange = (event: any, file = false) => {
        if (!file) {
            setMessage(event.target.value);
        } else {
            const file = event.target.files[0];
            const newPhoto = {
                file,
                url: URL.createObjectURL(file)
            }
            setMessageImage(newPhoto);
        }
    }

    const getMessages = () => {
        const messages = currentChannel?.messages || [];
        const orderedByDate: any = {};

        messages?.forEach((message: iMessage) => {
            const { createdAt } = message;
            const dateStr = new Date(createdAt).toLocaleString().split(',')[0];
            if (orderedByDate.hasOwnProperty(dateStr)) {
                orderedByDate[dateStr].push(message);
            } else {
                orderedByDate[dateStr] = [message];
            }
        })

        setMessages(orderedByDate);
    }

    const joinChannel = () => {
        const isUserRoomMember = currentChannel?.members.find((member: iUser) => member.username === currentUser?.username);

        if (!isUserRoomMember) {
            joinRoom(id);
        } else {
            joinRoom(id, false);
        }
    }

    const onCloseImageMessageForm = () => {
        setMessageImage({
            file: null,
            url: ''
        })
    }

    return {
        message,
        messages,
        chosenEmoji,
        messageImage,
        channelImages,
        currentChannel,

        onSubmit,
        onChange,
        setChosenEmoji,
        onCloseImageMessageForm,
    }
}

export { useChat };