import React from "react";
import cn from "classnames";

import Logo from "../../../components/Logo";
import MyAccountController from "../../../components/MyAccountController";

import classes from "./myAccountHeader.module.css";
interface Props {
    classes?: object;
}

const MyAccountHeader = ({ classes: propsClasses }: Props) => {
    return (
        <header
            className={cn(
                "container mx-auto my-0 flex justify-between pt-6",
                classes.root
            )}
        >
            <Logo />
            <MyAccountController />
        </header>
    );
};

export default MyAccountHeader;
