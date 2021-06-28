import React from "react";
import LangSelector from "../../components/LangSelector";
import MyAccountFooter from "./MyAccountFooter";
import MyAccountHeader from "./MyAccountHeader";

const MyAccountLayout =
    <P extends object>(WrappedComponent: React.ComponentType<P>) =>
    (props: P) => {
        return (
            <React.Fragment>
                <LangSelector />
                <MyAccountHeader />
                <WrappedComponent {...props} />
                <MyAccountFooter />
            </React.Fragment>
        );
    };

export default MyAccountLayout;
