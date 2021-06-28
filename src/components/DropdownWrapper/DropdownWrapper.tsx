import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// talons
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useToggle } from "../../hooks/useToggle";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./dropdownwrapper.module.css";

interface Props {
    classes?: object;
    children: any;
    buttonContent: any;
}

const DropdownWrapper = ({
    classes: propsClasses,
    children,
    buttonContent,
}: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const dropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const { visible, onToggle } = useToggle();

    useOnClickOutside(dropdownRef, () => onToggle());

    return (
        <div className={classes.root}>
            <button onClick={onToggle} className={classes.toggleDropdown}>
                {buttonContent}
            </button>
            <AnimatePresence>
                {visible && (
                    <motion.section
                        ref={dropdownRef}
                        className={classes.dropdown}
                        initial={{
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transformOrigin: "top right",
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0,
                        }}
                    >
                        {children}
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DropdownWrapper;
