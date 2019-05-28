import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { ActionCable } from 'react-actioncable-provider';

const ConversationItem = props => {
    const { conversation, onClickItem, handleReceivedMessage } = props;

    const receivedMessage = response => handleReceivedMessage(response.message, conversation.id);

    return (
        <>
            <ListItem onClick={() => onClickItem(conversation)}>
                <ListItemAvatar><Avatar /></ListItemAvatar>
                <ListItemText primary={conversation.user_third.email} />
            </ListItem>

            <ActionCable
                key={conversation.id}
                channel={{ channel: 'MessagesChannel', conversation: conversation.id }}
                onReceived={receivedMessage}
            />
        </>
    )
};

export default ConversationItem;
