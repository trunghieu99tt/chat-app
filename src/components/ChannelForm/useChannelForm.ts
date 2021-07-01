import { useState } from "react";
import { useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import client from "../../api/client";
import { showChannelFormState } from "../../states/app.state";
import { channelState } from "../../states/room.state";
import { useSocket } from "../../talons/Socket/useSocket";
import { iChannel } from "../../types/channel.types";


const useChannelForm = () => {

    const [isVisibleChannelForm, setShowChannelForm] = useRecoilState(showChannelFormState);
    const params: any = useParams();
    const { id } = params;

    const channels = useRecoilValue(channelState);
    const channel = channels?.find((e: iChannel) => e._id === id);

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

        setShowChannelForm(false);
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

    const closeForm = () => setShowChannelForm(false);



    return {
        values,
        channelImage,
        visible: isVisibleChannelForm,
        onSubmit,
        onChange,
        closeForm
    }

}

export { useChannelForm };