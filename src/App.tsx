import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import { useRecoilState } from "recoil";

// libs
import { toast } from "react-toastify";

// utils
import client from "./api/client";

// pages
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Auth/Login.page";
import SignUpPage from "./pages/Auth/SignUp.page";

// components
import Loading from "./components/Loading";
import PublicRoute from "./components/route/PublicRoute";
import PrivateRouteController from "./routes/PrivateRouteController";

// states
import { userState } from "./states/user.state";

// styles
import "./App.css";

const App = () => {
    const [user, setUser] = useRecoilState(userState);
    const [loading, setLoading] = useState<boolean>(true);

    // router
    const history = useHistory();

    useEffect(() => {
        const token =
            localStorage.getItem("accessToken") &&
            JSON.parse(localStorage.getItem("accessToken") || "");
        if (token !== null && token.length > 3) {
            getUser();
            history.push("/my-profile");
        } else {
            setLoading(false);
            if (!window.location.href.includes("login")) {
                history.push("/login");
            }
        }
    }, []);

    const getUser = async () => {
        if (!user) {
            try {
                const response = await client.get("/user/me");
                setUser(response?.data?.data);
            } catch (error) {
                toast.error(error?.response?.data?.message);
                if (!window.location.href.includes("login")) {
                    history.push("/login");
                }
            }
        }
        setLoading(false);
    };

    if (loading) return <Loading />;

    if (user) {
        return <PrivateRouteController />;
    }

    return (
        <React.Fragment>
            <Switch>
                <PublicRoute component={LoginPage} path="/login" />
                <PublicRoute component={SignUpPage} path="/signup" />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    );
};

export default App;
