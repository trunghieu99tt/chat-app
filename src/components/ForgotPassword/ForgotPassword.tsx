import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// talons
import { useForgotPassword } from "./useForgotPassword";

// utils
import mergeClasses from "../../utils/mergeClasses";

// components
import Input from "../Input";

// styles
import defaultClasses from "./forgotPassword.module.css";

interface Props {
    classes?: object;
    onClose: () => void;
}

const initState = {
    opacity: 0,
    y: "1rem",
};

const ForgotPassword = ({ classes: propsClasses, onClose }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const { t } = useTranslation();

    const { register, onSubmit } = useForgotPassword({
        onClose,
    });

    return (
        <motion.section
            className={classes.root}
            initial={initState}
            animate={{
                ...initState,
                opacity: 1,
                y: 0,
            }}
            exit={initState}
        >
            <div className={classes.mask} onClick={onClose}></div>
            <form onSubmit={onSubmit} className={classes.form}>
                <h3 className={classes.heading}>
                    {t("forgotPassword.heading")}
                </h3>
                <h4 className={classes.subHeading}>
                    {t("forgotPassword.subHeading")}
                </h4>
                <div>
                    <Input
                        type="email"
                        name="email"
                        ref={register}
                        id="forgotPasswordEmail"
                        placeholder="Enter your email here..."
                        required
                    />
                </div>
                <button type="submit" className={classes.submitBtn}>
                    {t("button.send")}
                </button>
            </form>
        </motion.section>
    );
};

export default ForgotPassword;
