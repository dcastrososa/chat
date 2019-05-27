import React, { useState } from "react";
import { IP, HEADERS } from "./../../../system/Config";

export const NewConversationForm = props => {
    const [ title, setTitle ] = useState("");

    const handleChange = e => setTitle(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        fetch(`${IP}/conversations`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({title: title})
        });
        setTitle("");
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>New Conversation</label>
                <br />

                <input type="text" value={title} onChange={handleChange} />
                <input type="submit" />
            </form>
        </div>
    )
}