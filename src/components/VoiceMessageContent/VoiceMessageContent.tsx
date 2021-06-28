import React, { useState } from "react";
import ReactPlayer from "react-player";

// utils
import mergeClasses from "../../utils/mergeClasses";

// icons
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";

// styles
import defaultClasses from "./voicemessagecontent.module.css";
import { useEffect } from "react";
import { useRef } from "react";

interface Props {
    classes?: object;
    url: string;
}

type TProgress = {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
};

const VoiceMessageContent = ({ classes: propsClasses, url }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const fileRef = useRef<any>(null);

    const [playing, setPlaying] = useState<boolean>(false);

    const onEnded = () => setPlaying(false);

    const onPlay = () => {
        console.log("Playing");
    };

    const togglePlay = () => setPlaying((value) => !value);

    return (
        <div className={classes.root}>
            <ReactPlayer
                ref={fileRef}
                key={Math.random()}
                url={url}
                loop={false}
                playing={playing}
                onPlay={onPlay}
                onEnded={onEnded}
                width={0}
                height={0}
                style={{
                    display: "none",
                }}
            ></ReactPlayer>

            <div className={classes.wrapper}>
                {/* <div
                    className={classes.progress}
                    style={{
                        width: `${(played / duration) * 100}%`,
                    }}
                ></div> */}
                <button className={classes.controlBtn} onClick={togglePlay}>
                    {playing ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
                </button>

                {/* <span className={classes.duration}>
                        {duration?.toFixed(2) || "0.00"}s
                    </span> */}
            </div>
        </div>
    );
};

export default VoiceMessageContent;
