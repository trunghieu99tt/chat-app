import React from "react";
import { iFile } from "../../types/message.types";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./imagemessageform.module.css";

interface Props {
    classes?: object;
    onSubmit: (event: any) => void;
    onCancel: () => void;
    onChange: (event: any) => void;
    data: iFile;
}

const ImageMessageForm = ({
    classes: propsClasses,
    onSubmit,
    onCancel,
    onChange,
    data,
}: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <React.Fragment>
            <div className={classes.mask} onClick={onCancel}></div>
            <section className={classes.root}>
                <form className={classes.main} onSubmit={onSubmit}>
                    <div className={classes.imageField}>
                        <figure>
                            <img
                                src={data.url}
                                alt=""
                                className={classes.image}
                            />
                        </figure>
                        <p className={classes.fileName}>{data.file?.name}</p>
                        <div className={classes.message}>
                            <label htmlFor="message">Message</label>
                            <input
                                type="text"
                                name="message"
                                onChange={onChange}
                                required
                                className={classes.input}
                            />
                        </div>
                    </div>

                    <div className={classes.btnGroup}>
                        <button onClick={onCancel}>Cancel</button>
                        <button type="submit" className={classes.btnSubmit}>
                            Upload
                        </button>
                    </div>
                </form>
            </section>
        </React.Fragment>
    );
};

export default ImageMessageForm;
