import React from "react";
import NewMessageForm from "./../component/NewMessageForm";

const Conversation = props => {
    const { conversation } = props;
    const { messages } = conversation;

    return (
        <div>
            <h1>{conversation.user_third.email}</h1>

            {messages.map( message => (
                <div key={message.id}><strong>{message.user_send.email}</strong>  {message.text}</div>
            ))}

            <NewMessageForm conversation_id={conversation.id} />
        </div>
    )
};

export default Conversation;
