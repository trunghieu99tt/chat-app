import React from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./emailform.module.css";

interface Props {
    classes?: object;
    onSubmit: () => void;
    onClose: () => void;
}

const EmailForm = ({ classes: propsClasses, onSubmit, onClose }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <section className={classes.root}>
            <div className={classes.mask} onClick={onClose}></div>
            <form onSubmit={onSubmit} className={classes.form}>
                <div>
                    Enter your user account's verified email address and we will
                    send you a new password.
                </div>
                <div>
                    <input
                        type="email"
                        id="forgotPasswordEmail"
                        className={classes.input}
                    />
                </div>
                <button type="submit">Send</button>
            </form>
        </section>
    );
};

export default EmailForm;
