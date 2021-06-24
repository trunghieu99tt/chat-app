import React, { useState } from "react";
import { ReactMic } from "react-mic";
import ReactPlayer from "react-player";

// talons
import { useFirebase } from "../../talons/Firebase/useFirebase";

// utils
import mergeClasses from "../../utils/mergeClasses";

// types
import { CgRecord } from "react-icons/cg";
import { FaRegStopCircle } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

// styles
import defaultClasses from "./voicemessageform.module.css";
import { useEffect } from "react";
import { useSocket } from "../../talons/Socket/useSocket";
import { useParams } from "react-router";

interface Props {
    classes?: object;
}

const VoiceMessageForm = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const [recording, setRecording] = useState<boolean>(false);
    const [recordData, setRecordData] = useState<any>(null);

    const { uploadToStorage, fileUrl, setFileUrl } = useFirebase();
    const params: any = useParams();
    const { id } = params;
    const { addMessage } = useSocket();

    useEffect(() => {
        if (fileUrl) {
            sendMessage();
        }
    }, [fileUrl]);

    const startRecording = () => {
        setRecording(true);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    const onRecordData = (recordedBlob: any) => {
        console.log("chunk of real-time data is: ", recordedBlob);
    };

    const onStopRecord = (recordedBlob: any) => {
        console.log("recordedBlob is: ", recordedBlob);
        setRecordData(recordedBlob);
    };

    const sendAudio = () => {
        if (!recordData) return;
        console.log(`recordData`, recordData);
        uploadToStorage(recordData.blobURL);
    };

    const sendMessage = async () => {
        addMessage("", id, fileUrl);
        setFileUrl(null);
        setRecordData(null);
        setRecording(false);
    };

    return (
        <div className={classes.root}>
            {recordData && (
                <ReactPlayer
                    url={recordData.blobURL}
                    height="2rem"
                    width="100%"
                    playing
                />
            )}
            <ReactMic
                record={recording}
                className={classes.recordSoundwave}
                onStop={onStopRecord}
                onData={onRecordData}
                strokeColor="#fff"
                backgroundColor={"var(---mGray1)"}
            />
            <div className={classes.btnGroup}>
                <button
                    className={classes.btn}
                    onClick={startRecording}
                    type="button"
                >
                    <CgRecord />
                </button>
                <button
                    className={classes.btn}
                    onClick={stopRecording}
                    type="button"
                >
                    <FaRegStopCircle />
                </button>
                {recordData && (
                    <button
                        className={classes.btn}
                        onClick={sendAudio}
                        type="button"
                    >
                        <FiSend />
                    </button>
                )}
            </div>
        </div>
    );
};

export default VoiceMessageForm;
