import React from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./tag.module.css";

interface Props {
    classes?: object;
    text: string;
}

const Tag = ({ classes: propsClasses, text }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return <div className={classes.root}>{text}</div>;
};

export default Tag;
