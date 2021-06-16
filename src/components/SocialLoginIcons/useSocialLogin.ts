import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import client from "../../api/client";
import { userState } from "../../states/user.state";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";


/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html}
 * that contains social login logic
 *
 * @kind function.
 *
 * @return {{
 * showAlert: func,
 * responseGoogle: func,
 * }}
 */
const useSocialLogin = () => {
    const setUser = useSetRecoilState(userState);
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");
        if (hasCode) {
            const newUrl = url.split("?code=");
            const code = newUrl[1];
            responseGithub(code);
        }
    }, []);

    const showAlert = () => {
        alert(
            "Try Google instead ;). Didn't implemented other social network yet ;)"
        );
    };

    const responseGoogle = async (data: any) => {
        setLoading(true);
        try {
            const response = await client.post("/auth/google", {
                tokenId: data.tokenId,
            });
            handleAuth(response);
        } catch (error) {
            console.log(`error`, error);
        }
        setLoading(false);
    };

    const responseGoogleFail = () => {
        toast.error("Something went wrong");
    }

    const responseGithub = async (code: string) => {
        setLoading(true);
        const response = await client.post("/auth/github", {
            code
        });
        setLoading(false);
        handleAuth(response);
    }

    const handleAuth = (response: any) => {
        const accessToken = response?.data?.accessToken;
        const user = response?.data?.data;
        if (user && accessToken) {
            window.localStorage.setItem("accessToken", JSON.stringify(accessToken));
            setUser(user);
            history.push('/');
            toast.success("Login Success");
        }
    }

    return {
        loading,
        showAlert,
        responseGoogle,
        responseGoogleFail
    }

}

export { useSocialLogin };