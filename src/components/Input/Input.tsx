import React, { InputHTMLAttributes } from "react";
import cn from "classnames";
import mergeClasses from "../../utils/mergeClasses";

import defaultClasses from "./input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string;
    name: string;
    icon?: JSX.Element;
    placeholder?: string;
    error?: string | undefined;
    required?: boolean;
    rest?: Object;
    classes?: object;
}

const Input = React.forwardRef(
    (
        {
            type,
            name,
            icon,
            placeholder,
            error,
            hidden,
            classes: propsClasses,
            ...rest
        }: InputProps,
        ref: any
    ) => {
        const classes = mergeClasses(defaultClasses, propsClasses);

        return (
            <div
                className={cn(classes.root, {
                    hidden: hidden,
                })}
            >
                <div className={classes.wrapper}>
                    {icon}

                    <input
                        style={{ minWidth: 0 }}
                        className={classes.input}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        ref={ref}
                        {...rest}
                    />
                </div>
                {error && <p className={classes.error}>{error}</p>}
            </div>
        );
    }
);

export default Input;
