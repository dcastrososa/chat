import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { ActionCable } from 'react-actioncable-provider';
import { AvatarUser } from "./../../../components/AvatarUser";

const ConversationItem = props => {
    const { conversation, onClickItem, handleReceivedMessage } = props;

    const receivedMessage = response => handleReceivedMessage(response.message, conversation.id);

    return (
        <>
            <ActionCable
                key={conversation.id}
                channel={{ channel: 'MessagesChannel', conversation: conversation.id }}
                onReceived={receivedMessage}
            />

            <ListItem onClick={() => onClickItem(conversation)}>
                <ListItemAvatar>
                    <Avatar style={{backgroundColor: `${"#"+((1<<24)*Math.random()|0).toString(16)}`}}> <AvatarUser text={conversation.user_third.email.split("")[0]} /> </Avatar>
                </ListItemAvatar>
                <ListItemText primary={conversation.user_third.email} />
            </ListItem>
        </>
    )
};

export default ConversationItem;
