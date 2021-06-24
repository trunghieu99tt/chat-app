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
    const [messageImage, setMessageImage] = useState<{
        file: File | null,
        url: string,
    }>({
        file: null,
        url: ""
    })

    const currentChannel = channels?.find((e: iChannel) => e._id === id);

    useEffect(() => {
        if (currentChannel) {
            getMessages();
            joinChannel();
        }
    }, [currentChannel]);



    const onSubmit = async (event: any) => {
        event.preventDefault();
        if (!messageImage.file) {
            addMessage(message, id);
            setMessage('');
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
        messageImage,
        currentChannel,

        onSubmit,
        onChange,
        onCloseImageMessageForm,
    }
}

export { useChat };