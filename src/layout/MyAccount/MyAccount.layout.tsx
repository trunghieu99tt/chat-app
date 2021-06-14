import React from "react";
import MyAccountFooter from "./MyAccountFooter";
import MyAccountHeader from "./MyAccountHeader";

const MyAccountLayout =
    <P extends object>(WrappedComponent: React.ComponentType<P>) =>
    (props: P) => {
        return (
            <React.Fragment>
                <MyAccountHeader />
                <WrappedComponent {...props} />
                <MyAccountFooter />
            </React.Fragment>
        );
    };

export default MyAccountLayout;
