import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import client from "../../../api/client";
import { userState } from "../../../states/user.state";
import { toast } from 'react-toastify';


/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} 
 * that contains edit account logic
 *
 * @kind function.
 *
 * @return {{
 * register: any,
 * userPhoto: object,
 * goBack: func,
 * handleSubmit: func,
 * onChangePhoto: func,
 * }}
 */
const useEditMyAccount = () => {
    const { register, handleSubmit } = useForm();
    const [user, setUser] = useRecoilState(userState);
    const [userPhoto, setUserPhoto] = useState<{
        file: File | null,
        url: string,
    }>({
        file: null,
        url: user?.photo || ""
    })
    const history = useHistory();

    const onSubmit = async (data: any) => {
        /**
         * Since we partially update user information, so that we need to omit 
         * all null,empty value
         */
        Object.keys(data).filter(key => {
            return data[key] === '' || data[key].length === 0
        }).forEach(key => delete data[key]);

        if (data['photo'] && data['photo'].length > 0) {
            data['photo'] = data['photo'][0];
        }

        /**
         * If user used third party login feature and hasn't changed username and password 
         * user will have one time to change username and password to enable login with username/password
         */
        if (data['username'] && data['password']) {
            if (user?.isThirdParty === true) {
                /**
                 * We use isThirdParty to mark that user used third party login feature
                 * after user changed username/password, we will turn this value to false
                 * so that user will be marked "enabled username/password feature"
                 * therefore, after this time, user will not be able to change username anymore
                 */
                data['isThirdParty'] = false;
            }
        }
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as any);
        })
        try {
            const response = await client.patch('/user/update', formData);
            if (response?.data?.status === 200) {
                setUser(response.data.data);
                history.push('/my-profile');
                toast.success("Update profile successfully");
            } else {
                toast.error("Something went wrong. Please try again later")
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const goBack = () => history.goBack();

    const onChangePhoto = (event: any) => {
        const file = event.target.files[0];
        const newPhoto = {
            file,
            url: URL.createObjectURL(file)
        }
        setUserPhoto(newPhoto);
    }

    return {
        register,
        userPhoto,
        goBack,
        onChangePhoto,
        handleSubmit: handleSubmit(onSubmit)
    }

}

export { useEditMyAccount };