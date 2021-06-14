import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import client from "../../api/client";
import { userState } from "../../states/user.state";
import { toast } from 'react-toastify';


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

    const showAlert = () => {
        alert(
            "Try Google instead ;). Didn't implemented other social network yet ;)"
        );
    };

    const responseGoogle = async (data: any) => {
        const response = await client.post("/auth/google", {
            tokenId: data.tokenId,
        });
        const accessToken = response?.data?.accessToken;
        const user = response?.data?.data;
        if (user && accessToken) {
            window.localStorage.setItem("accessToken", JSON.stringify(accessToken));
            setUser(user);
            history.push('/');
            toast.success("Login Success");
        }
    };

    return {
        showAlert,
        responseGoogle
    }

}

export { useSocialLogin };