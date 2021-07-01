import React from "react";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./spinner.module.css";

interface Props {
    classes?: object;
}

const Spinner = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <div className={classes.root}>
            <div className={classes.mask}></div>
            <div className={classes.spinner}></div>
        </div>
    );
};

export default Spinner;
