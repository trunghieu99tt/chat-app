import React from "react";
import { Link } from "react-router-dom";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./channellistitem.module.css";

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
                {data.image ? (
                    <figure className={classes.content}>
                        <img
                            src={data.image}
                            alt={`${data.name}-${data._id}`}
                            className={classes.image}
                        />
                        <figcaption className={classes.name}>
                            {data.name}
                        </figcaption>
                    </figure>
                ) : (
                    <div className={classes.content}>
                        <div className={classes.imageText}>{data.name[0]}</div>
                        <p className={classes.name}>{data.name}</p>
                    </div>
                )}
            </Link>
        </article>
    );
};

export default ChannelListItem;
