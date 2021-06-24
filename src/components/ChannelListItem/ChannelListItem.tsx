import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./channellistitem.module.css";

// images
import defaultRoomImage from "../../static/images/default_room.png";

// types
import { iChannel } from "../../types/channel.types";

interface Props {
    data: iChannel;
    classes?: object;
    isSelected: boolean;
    onHover: () => void;
    onLeave: () => void;
}

const ChannelListItem = ({
    classes: propsClasses,
    data,
    isSelected,
    onHover,
}: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <Link to={`/room/${data._id}`}>
            <motion.article
                className={classes.root}
                onHoverStart={() => {
                    onHover();
                }}
            >
                <figure className={classes.content}>
                    <img
                        src={data?.image || defaultRoomImage}
                        alt={`${data.name}-${data._id}`}
                        className={classes.image}
                    />
                    <figcaption className={classes.name}>
                        {data.name}
                    </figcaption>
                </figure>
                {isSelected && (
                    <motion.div
                        layoutId="contactCard-outline"
                        className={classes.itemOutline}
                        initial={false}
                        animate={{ borderColor: "var(--mBlue1)" }}
                        transition={spring}
                    ></motion.div>
                )}
            </motion.article>
        </Link>
    );
};

const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30,
};

export default ChannelListItem;
