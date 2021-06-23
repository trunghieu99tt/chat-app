import { useState } from "react";
import client from "../../api/client";
import { useSocket } from "../../talons/Socket/useSocket";

type Props = {
    closeForm: () => void;
}

const useChannelForm = ({ closeForm }: Props) => {

    const { createChannel } = useSocket();

    const [channelImage, setChannelImage] = useState<{
        file: File | null,
        url: string,
    }>({
        file: null,
        url: ""
    })

    const [values, setValues] = useState<any>({
        name: '',
        description: '',
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
        createChannel({
            ...values,
            image
        });
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