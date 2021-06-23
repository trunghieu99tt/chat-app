import React from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";

// icons
import { BsPlus } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

// styles
import defaultClasses from "./textmessageform.module.css";

interface Props {
    classes?: object;
    onSubmit: (event: any) => void;
    onChange: (event: any, isFile?: boolean) => void;
    value: string;
}

const TextMessageForm = ({
    classes: propsClasses,
    value,
    onSubmit,
    onChange,
}: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <form onSubmit={onSubmit} className={classes.root}>
            <div className="w-6 h-6 flex items-center justify-center bg-m">
                <input
                    id="messageImage"
                    type="file"
                    className="hidden"
                    name="image"
                    onChange={(event) => onChange(event, true)}
                />
                <label
                    htmlFor="messageImage"
                    className={classes.fileInputLabel}
                >
                    <BsPlus />
                </label>
            </div>
            <input
                type="text"
                name="message"
                placeholder="Type a message here"
                className={classes.textInput}
                value={value}
                onChange={onChange}
            />
            <button className={classes.submitBtn} onClick={onSubmit}>
                <IoMdSend />
            </button>
        </form>
    );
};

export default TextMessageForm;
