import React, { useState } from "react";
import { MessageDAO } from "./../../../common/dao/MessageDAO";
import TextField from '@material-ui/core/TextField';

const NewMessageForm = props => {
    const { conversation_id } = props;
    const [ value, setValue ] = useState("");

    const sendMessage = async e => {
        e.preventDefault();
        const message = {
            conversation_id: conversation_id,
            text: value
        };

        try {
            await MessageDAO.save(message);
            setValue("");
        } catch (err) {
            throw err;
        }
    };

    return (
        <form style={{width: "100%", marginTop: "20px"}} onSubmit={sendMessage}>
            <TextField 
                style={{width: "80%"}}
                type="text" 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                placeholder="New Message" />

            {/* <input type="submit" disabled={!value} /> */}
        </form>
    )
};

export default NewMessageForm;