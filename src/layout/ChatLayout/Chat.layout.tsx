import React from "react";

// components
import Sidebar from "./Sidebar";

import classes from "./chatLayout.module.css";
import LangSelector from "../../components/LangSelector";

const ChatLayout = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    return (props: P) => {
        return (
            <div className={classes.root}>
                <LangSelector />
                <Sidebar />
                <WrappedComponent {...props} />
            </div>
        );
    };
};

export default ChatLayout;
