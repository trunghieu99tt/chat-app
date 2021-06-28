import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// talons
import { useLang } from "../../talons/Lang/useLang";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useToggle } from "../../hooks/useToggle";

// utils
import mergeClasses from "../../utils/mergeClasses";

// images
import USFlag from "../../static/images/Us_flag.png";
import ViFlag from "../../static/images/Vi_flag.png";

// styles
import defaultClasses from "./langselector.module.css";

interface Props {
    classes?: object;
}

type LangObj = {
    lang: string;
    icon: any;
};

const langList: LangObj[] = [
    {
        lang: "en",
        icon: USFlag,
    },
    {
        lang: "vi",
        icon: ViFlag,
    },
];

const LangSelector = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const langSelectionRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const { lang, changeLang } = useLang();
    const { visible, onToggle, onHide } = useToggle();

    useOnClickOutside(langSelectionRef, () => onHide());

    const imgSrc = langList.find((e: LangObj) => e.lang === lang)?.icon;

    return (
        <div className={classes.root} ref={langSelectionRef}>
            <button className={classes.curr} onClick={onToggle}>
                <img
                    className={classes.icon}
                    src={imgSrc}
                    alt={`${lang} flag`}
                    key={lang}
                />
                {lang}
            </button>
            <AnimatePresence>
                {visible && (
                    <motion.ul
                        className={classes.list}
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
                        {langList &&
                            langList.length > 0 &&
                            langList.map((langObj: LangObj, idx: number) => {
                                return (
                                    <li className={classes.listItem}>
                                        <button
                                            onClick={() =>
                                                changeLang(langObj.lang)
                                            }
                                        >
                                            <img
                                                className={classes.icon}
                                                src={langObj.icon}
                                                alt="US flag"
                                            />
                                            {langObj.lang}
                                        </button>
                                    </li>
                                );
                            })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LangSelector;
