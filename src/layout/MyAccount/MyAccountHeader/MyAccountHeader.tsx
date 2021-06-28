import React from "react";
import Logo from "../../../components/Logo";
import MyAccountController from "../../../components/MyAccountController";

interface Props {
    classes?: object;
}

const MyAccountHeader = ({ classes: propsClasses }: Props) => {
    return (
        <header className="container mx-auto my-0 flex justify-between pt-6">
            <Logo />
            <MyAccountController />
        </header>
    );
};

export default MyAccountHeader;
