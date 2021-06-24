import React from "react";
import { Link } from "react-router-dom";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./channellistitem.module.css";

// images
import defaultRoomImage from "../../static/images/default_room.png";

// types
import { iChannel } from "../../types/channel.types";

interface Props {
    classes?: object;
    data: iChannel;
}

const ChannelListItem = ({ classes: propsClasses, data }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <article className={classes.root}>
            <Link to={`/room/${data._id}`}>
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
            </Link>
        </article>
    );
};

export default ChannelListItem;
