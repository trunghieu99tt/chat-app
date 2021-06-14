import React from "react";
import AuthForm from "../../components/AuthForm";

interface Props {}

const LoginPage = (props: Props) => {
    return (
        <React.Fragment>
            <AuthForm />
        </React.Fragment>
    );
};

export default LoginPage;
