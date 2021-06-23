import React from "react";

// Libs
import { Route, Switch } from "react-router-dom";

// pages
import NotFound from "../pages/NotFound";
import EditMyAccount from "../pages/MyAccount/Edit";
import OverviewMyAccount from "../pages/MyAccount/Overview";
import Chat from "../pages/Chat";
import Welcome from "../pages/Welcome";

// components
import PrivateRoute from "../components/route/PrivateRoute";

const PrivateRoutesController = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Welcome} />
            <PrivateRoute exact path="/room/:id" component={Chat} />
            <PrivateRoute
                exact
                path="/my-profile"
                component={OverviewMyAccount}
            />
            <PrivateRoute
                exact
                path="/my-profile/edit"
                component={EditMyAccount}
            />

            <Route component={NotFound} />
        </Switch>
    );
};

export default PrivateRoutesController;
