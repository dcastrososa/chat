import React from "react";
import { NewMessageForm } from "./NewMessageForm";

export const MessageArea = ({
    conversation: { id, title, messages },
}) => {

    const sortedMessages = messages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    return (
        <div>
            <h2>{title}</h2>
            <ul>
                {sortedMessages.map(message => (
                    <li key={message.id}>{message.text}</li>
                ))}
            </ul>
            
            <NewMessageForm conversation_id={id} />
        </div>
    )
}
