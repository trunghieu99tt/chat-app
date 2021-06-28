import React from "react";
import { motion } from "framer-motion";

// components
import Mask from "../Mask";

// styles
import classes from "./channelForm.module.css";

// talons
import { useChannelForm } from "./useChannelForm";

// types
import { iChannel } from "../../types/channel.types";
import { useRecoilValue } from "recoil";
import { screenSizeState } from "../../states/app.state";

interface Props {
    closeForm: () => void;
    channel?: iChannel;
}

const initState = {
    scale: 0,
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    opacity: 0,
};

const ChannelForm = ({ closeForm, channel }: Props) => {
    const { values, onSubmit, onChange, channelImage } = useChannelForm({
        closeForm,
        channel,
    });

    const screenSize = useRecoilValue(screenSizeState);

    let value = {
        ...initState,
    };

    if (screenSize !== "DESKTOP") {
        value = {
            ...initState,
            x: "0",
        };
    }

    if (screenSize === "MOBILE") {
        value = {
            ...initState,
            left: "0",
            x: "0",
            y: "0",
            top: "25%",
        };
    }

    return (
        <React.Fragment>
            <Mask onClick={closeForm} />
            <motion.div
                className={classes.root}
                initial={value}
                animate={{
                    ...value,
                    scale: 1,
                    opacity: 1,
                }}
                exit={{ ...value, scale: 1.25 }}
                transition={{
                    values: 0.1,
                }}
            >
                <h3 className={classes.title}>New Channel</h3>
                <form onSubmit={onSubmit}>
                    <div className="mb-6">
                        <input
                            value={values.name}
                            type="text"
                            name="name"
                            placeholder="Channel name"
                            className={classes.input}
                            onChange={onChange}
                            required
                        ></input>
                    </div>
                    <div>
                        <textarea
                            value={values.description}
                            rows={5}
                            name="description"
                            placeholder="Channel description"
                            className={classes.input}
                            onChange={onChange}
                            required
                        ></textarea>
                    </div>

                    <div className="mt-3">
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className="hidden"
                            onChange={(event) => onChange(event, true)}
                        />
                        <label htmlFor="image" className={classes.fileBtn}>
                            Channel Image
                        </label>
                        {channelImage.url && (
                            <figure className="mt-3">
                                <img
                                    src={channelImage.url}
                                    alt=""
                                    className="w-24 h-24 object-cover"
                                />
                            </figure>
                        )}
                    </div>

                    <button type="submit" className={classes.submitBtn}>
                        Save
                    </button>
                </form>
            </motion.div>
        </React.Fragment>
    );
};

export default ChannelForm;
