import React, { useState, useEffect } from "react";
import { ActionCable } from 'react-actioncable-provider';
import { IP, HEADERS } from "../../system/Config";
import { Cable } from "./component/Cable";
import { NewConversationForm } from "./component/NewConversationForm";
import { MessageArea } from "./component/MessageArea";
import { ConversationDAO } from "./../../common/dao/ConversationDAO";

const initialState = {
    conversations: [], 
    activeConversation: null
};

export const ConversationsList = props => {
    const [ state, setState ] = useState(initialState);

    const setConversation = async () => {
        try {
            const response = await ConversationDAO.findAll();
            setState({...state, conversations: response.data})
        } catch(err) {
            throw err;
        }
    };

    useEffect(() => {
        setConversation();
    }, []);

    const handleClick = id => {
        setState({
            ...state,
            "activeConversation": id
        })
    };

    const handleReceivedMessage = response => {
        console.log("LLEGO UN NUEVO MENSAJE", response)
        const { message } = response;
        const conversations = [...state.conversations];
        const conversation = conversations.find( conversation => conversation.id === message.conversation_id );
        conversation.messages = [...conversation.messages, message];
        setState({...state, "conversations": conversations});
    };

    const handleReceivedConversation = response => {
        console.log("nueva conversacionnnnnnnnnnnnnnnnnnnn")
        const conversations = [...state.conversations];
        conversations.push(response.conversation);
        setState({...state, conversations: conversations});
    }

    const { conversations, activeConversation } = state;

    return (
        <div>
            <ActionCable 
                channel={{ channel: "ConversationsChannel"}} 
                onReceived={handleReceivedConversation} />
            {conversations.length > 0 && <Cable conversations={conversations} handleReceivedMessage={handleReceivedMessage} />} 

            <h2>Conversations</h2>
            <ul>
                {conversations.map( conversation => (
                    <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
                        {conversation.id}
                    </li>
                ))}
            </ul>

            <NewConversationForm />

            {activeConversation && <MessageArea conversation={findActiveConversation(conversations,activeConversation)} />}
        </div>
    )
}

const findActiveConversation = (conversations, activeConversation) => conversations.find( conversation => conversation.id === activeConversation );