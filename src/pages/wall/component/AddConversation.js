import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useWallLogic } from "./../WallLogic";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux";
import { ConversationDAO } from "./../../../common/dao/ConversationDAO";

const AddConversation = props => {
    const { open, handleClose, users, user } = props;

    /**
     * Create a new conversation
     * @param {String|Number} userId 
     */
    const newConversation = async userId => {
        const conversation = {
            user_send_id: user.id,
            user_receive_id: userId
        };

        try {
          await ConversationDAO.save(conversation);
          handleClose();
        } catch (err) {
            console.log("err")
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Conversation</DialogTitle>

            <DialogContent>
                <List>
                    {users.map( user => (
                        <ListItem key={user.id} onClick={() => newConversation(user.id, handleClose)}>
                            <ListItemAvatar><Avatar /></ListItemAvatar>
                            <ListItemText primary={user.email} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(AddConversation);
