import { useState } from "react";
import client from "../../api/client";
import { useSocket } from "../../talons/Socket/useSocket";
import { iChannel } from "../../types/channel.types";

type Props = {
    closeForm: () => void;
    channel?: iChannel;
}

const useChannelForm = ({ closeForm, channel }: Props) => {
    const { createChannel, updateChannel } = useSocket();
    const [channelImage, setChannelImage] = useState<{
        file: File | null,
        url: string,
    }>({
        file: null,
        url: channel?.image || ''
    })

    const [values, setValues] = useState<any>({
        name: channel?.name || '',
        description: channel?.description || '',
    })

    const onSubmit = async (event: any) => {
        event.preventDefault();
        let image = '';
        if (channelImage.file) {
            const formData = new FormData();
            formData.append('image', channelImage.file);
            const response = await client.post('upload/image', formData);
            if (response.status === 201) {
                image = response.data;
            }
        }
        if (!channel) {
            createChannel({
                ...values,
                image
            });
        } else {
            updateChannel({
                ...channel,
                ...values,
                image: image !== '' ? image : channel.image
            })
        }

        closeForm();
    }

    const onChange = (event: any, file = false) => {
        if (!file) {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            })
        } else {
            const file = event.target.files[0];
            const newPhoto = {
                file,
                url: URL.createObjectURL(file)
            }
            setChannelImage(newPhoto);
        }
    }

    return {
        values,
        channelImage,
        onSubmit,
        onChange
    }

}

export { useChannelForm };