import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import client from "../../api/client";
import { userState } from "../../states/user.state";
import { toast } from 'react-toastify';
import { useState } from "react";


type Props = {
    isRegister?: boolean
}


/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html}
 * that contains authentication logic
 *
 * @kind function.
 *
 * @return {{
 * register: any,
 * handleSubmit: func,
 * }}
 */
const useAuth = ({ isRegister = false }: Props) => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const setUser = useSetRecoilState(userState);

    const [visibleEmailForm, setVisibleEmailForm] = useState<boolean>(false);

    const onSubmit = async (formData: any) => {
        if (!isRegister)
            await handleLogin(formData);
        else {
            await handleRegister(formData);
        }
    }

    const handleLogin = async (formData: any) => {
        try {
            const response = await client.post("/auth/signin", formData);
            const accessToken = response?.data?.accessToken;
            if (accessToken) {
                localStorage.setItem("accessToken", `"${accessToken}"`);
                const response = await client.get('/user/me');
                if (response?.status === 200) {
                    setUser(response?.data?.data);
                    toast.success("Login successful");
                    history.push('/')
                }
            } else {
                toast.error("Login Failed");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleLogout = async () => {
        const response = await client.post('/auth/logout');
        const message = response?.data?.message;
        localStorage.setItem("accessToken", "");
        setUser(null);
        history.push("/login");
        toast.info(message);
    }

    const handleRegister = async (formData: any) => {
        try {
            const response = await client.post("/auth/signup", formData);
            const accessToken = response?.data?.accessToken;
            const user = response?.data?.data;
            if (accessToken) {
                localStorage.setItem("accessToken", `"${accessToken}"`);
                setUser(user);
                history.push('/')
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleForgotPassword = async () => {
        try {

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const onCloseEmailForm = () => setVisibleEmailForm(false);

    const onOpenEmailForm = () => setVisibleEmailForm(true);

    return {
        register,
        visibleEmailForm,
        handleLogout,
        onCloseEmailForm,
        handleSubmit: handleSubmit(onSubmit),
        handleForgotPassword, onOpenEmailForm
    }
}

export { useAuth }