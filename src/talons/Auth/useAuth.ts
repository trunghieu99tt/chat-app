import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import client from "../../api/client";
import { userState } from "../../states/user.state";
import { toast } from 'react-toastify';


type Props = {
    isRegister: boolean
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
const useAuth = ({ isRegister }: Props) => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const setUser = useSetRecoilState(userState);

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
                    history.push('/my-profile')
                }
            } else {
                toast.error("Login Failed");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleRegister = async (formData: any) => {
        try {
            const response = await client.post("/auth/signup", formData);
            const accessToken = response?.data?.accessToken;
            const user = response?.data?.data;
            if (accessToken) {
                localStorage.setItem("accessToken", `"${accessToken}"`);
                setUser(user);
                history.push('/my-profile')
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return {
        register,
        handleSubmit: handleSubmit(onSubmit)
    }
}

export { useAuth }