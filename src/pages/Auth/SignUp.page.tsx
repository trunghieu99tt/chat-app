import React from "react";
import AuthForm from "../../components/AuthForm";

interface Props {}

const SignUpPage = (props: Props) => {
    return (
        <React.Fragment>
            <AuthForm isRegister={true} />
        </React.Fragment>
    );
};

export default SignUpPage;
