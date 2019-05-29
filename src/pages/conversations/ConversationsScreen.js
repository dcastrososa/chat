import React from "react";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { useConversationLogic } from "./ConversationsLogic";
import ConversationItem from "./component/ConversationListItem";
import Conversation from "./component/Conversation";
import { ActionCable } from 'react-actioncable-provider';
import { connect } from "react-redux";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AddConversation from "./component/AddConversation";
import Icon from '@material-ui/core/Icon';

const ConversationsScreen = props => {
    const { user } = props;
    const { 
        conversations, 
        conversationActive, 
        handleReceivedConversation, 
        handleVisibilityAddConv, 
        visibleAddConv, 
        users,
        handleClickConversation,
        handleReceivedMessage,
        loadingConversations
    } = useConversationLogic();

    if (loadingConversations) {
        return <div>cargando...</div>
    }

    return (
        <div className="dFlex fullWidth fullHeight">
            <Grid container>
                <Grid item xs={3}>
                    <List>
                        <ListItem onClick={() => handleVisibilityAddConv()}>
                            <ListItemAvatar>
                                <Icon color="primary" style={{fontSize: "41px"}}>add_circle</Icon>
                            </ListItemAvatar>
                            <ListItemText primary="Add Conversation" />
                        </ListItem>
                        {conversations.map( conversation => (
                            <ConversationItem 
                                key={conversation.id} 
                                conversation={conversation}
                                onClickItem={handleClickConversation}
                                handleReceivedMessage={handleReceivedMessage} />
                        ))}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    {conversationActive && <Conversation 
                        conversation={conversations.find( conv => conv.id === conversationActive.id )} />}
                </Grid>
            </Grid>

            <AddConversation 
                handleClose={handleVisibilityAddConv}
                open={visibleAddConv}
                users={users} />

            <ActionCable 
                channel={{ channel: "ConversationsChannel", user_id: user.id }}
                onReceived={handleReceivedConversation} />
        </div>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(ConversationsScreen);
