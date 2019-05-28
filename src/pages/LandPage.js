import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConversationsList } from "./conversations/ConversationsList";
import LoginScreen from "./login/LoginScreen";
import WithVerifySesion from "./../components/hocs/WithVerifySesion";

export const LandPage = () => {
    return (
        <Switch>
            <Route path="/login" component={LoginScreen} />
            <WithVerifySesion>
                <Route path="/conversations" component={ConversationsList} />
            </WithVerifySesion>
        </Switch>
    )
}
