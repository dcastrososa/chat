import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginScreen from "./login/LoginScreen";
import ConversationsScreen from "./conversations/ConversationsScreen";

export const LandPage = () => {
    return (
        <Switch>
            <Route path="/login" component={LoginScreen} />
            <Route path="/conversations" component={ConversationsScreen} />
        </Switch>
    )
}
