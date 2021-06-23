import React from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./mask.module.css";

interface Props {
    classes?: object;
    onClick: () => void;
}

const Mask = ({ classes: propsClasses, onClick }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return <div className={classes.root} onClick={onClick}></div>;
};

export default Mask;
