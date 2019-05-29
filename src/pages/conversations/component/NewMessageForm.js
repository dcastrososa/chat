import React, { useState } from "react";
import { MessageDAO } from "./../../../common/dao/MessageDAO";

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
        <form onSubmit={sendMessage}>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />

            <input type="submit" disabled={!value} />
        </form>
    )
};

export default NewMessageForm;