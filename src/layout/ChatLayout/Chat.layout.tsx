import React from "react";

// components
import Sidebar from "./Sidebar";
import ChannelForm from "../../components/ChannelForm";
import LangSelector from "../../components/LangSelector";

import classes from "./chatLayout.module.css";

const ChatLayout = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    return (props: P) => {
        return (
            <React.Fragment>
                <ChannelForm />
                <div className={classes.root}>
                    <LangSelector />
                    <Sidebar />
                    <WrappedComponent {...props} />
                </div>
            </React.Fragment>
        );
    };
};

export default ChatLayout;
