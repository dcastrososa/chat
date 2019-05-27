import React, { useState, useEffect } from "react";
import { IP, HEADERS } from "./../../../system/Config";

export const NewMessageForm = props => {
    const [ state, setState ] = useState({
        text: "",
        conversation_id: props.conversation_id
    });

    useEffect(() => {
        setState({...state, conversation_id: props.conversation_id});
    }, []);

    const handleChange = e => setState({...state, text: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();

        //fetch(`${IP}/messages?text=${state.text}&conversation_id=${state.conversation_id}`);
        fetch(`${IP}/messages`, { method: "POST", headers: HEADERS, body: JSON.stringify(state)})
        setState({...state, text: ""});
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>New Message</label>
                <br />
                <input type="text" value={state.text} onChange={handleChange} />
                
                <input type="submit" />
            </form>
        </div>
    );
}