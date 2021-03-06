import React from "react";
import { motion } from "framer-motion";

// components
import Mask from "../Mask";

// styles
import classes from "./channelForm.module.css";

// talons
import { useChannelForm } from "./useChannelForm";
import { useTranslation } from "react-i18next";
const initState = {
    scale: 0,
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    opacity: 0,
};

const ChannelForm = () => {
    const { values, onSubmit, onChange, channelImage, closeForm, visible } =
        useChannelForm();

    const { t } = useTranslation();

    return (
        <div>
            {visible && (
                <React.Fragment>
                    <Mask onClick={closeForm} />
                    <motion.div
                        className={classes.root}
                        initial={initState}
                        animate={{
                            ...initState,
                            scale: 1,
                            opacity: 1,
                        }}
                        exit={{ ...initState, scale: 1.25 }}
                        transition={{
                            values: 0.1,
                        }}
                    >
                        <h3 className={classes.title}>{t("channel.new")}</h3>
                        <form onSubmit={onSubmit}>
                            <div className="mb-6">
                                <input
                                    value={values.name}
                                    type="text"
                                    name="name"
                                    placeholder={t("channel.name")}
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
                                    placeholder={t("channel.description")}
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
                                <label
                                    htmlFor="image"
                                    className={classes.fileBtn}
                                >
                                    {t("channel.image")}
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
                                {t("button.save")}
                            </button>
                        </form>
                    </motion.div>
                </React.Fragment>
            )}
        </div>
    );
};

export default ChannelForm;
