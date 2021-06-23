import React from "react";
import Sidebar from "./Sidebar";

const ChatLayout =
    <P extends object>(WrappedComponent: React.ComponentType<P>) =>
    (props: P) => {
        return (
            <div className="h-screen grid grid-cols-2-2-8 overflow-hidden">
                <Sidebar />
                <WrappedComponent {...props} />
            </div>
        );
    };

export default ChatLayout;
