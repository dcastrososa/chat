import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConversationsList } from "./conversations/ConversationsList";
import LoginScreen from "./login/LoginScreen";
import WallScreen from "./wall/WallScreen";

export const LandPage = () => {
    return (
        <Switch>
            <Route path="/login" component={LoginScreen} />
            <Route path="/conversations" component={ConversationsList} />
            <Route path="/wall" component={WallScreen} />
        </Switch>
    )
}
