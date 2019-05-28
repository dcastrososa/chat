import { useState, useEffect } from "react";
import { ConversationDAO } from "./../../common/dao/ConversationDAO";
import { UserDAO } from "./../../common/dao/UserDAO";

const initialState = {
    conversations: [],
    loadingConversations: true
};

const initialStateUsers = {
    loadingUsers: true,
    users: []
};

export const useWallLogic = () => {
    const [ stateConversations, setStateConversations ] = useState(initialState);
    const [ stateUsers, setStateUsers ] = useState(initialStateUsers);
    const [ visibleAddConv, setVisibleAddConv ] = useState(false);
    const [ conversationActive, setConversationActive ] = useState(null);

    /**
     * Get conversations
     */
    const getConversations = async () => {
        try {
            const response = await ConversationDAO.findAll();
            setStateConversations({
                ...stateConversations, 
                conversations: response.data, 
                loadingConversations: false
            });
            setConversationActive(response.data[0]);
        } catch (err) {
            console.log("err", err)
        }
    };

    /**
     * Get Users
     */
    const getUsers = async () => {
        try {
            const response = await UserDAO.findAll();
            setStateUsers({
                ...stateUsers,
                users: response.data,
                loadingUsers: false
            })
        } catch (err) {
            console.log("err", err)
        }
    };

    /**
     * Event triggered when a new conversation is created.
     * @param {object} response
     */
    const handleReceivedConversation = response => {
        const { conversation } = response;
        const conversations = [...stateConversations.conversations];
        conversations.unshift(conversation);
        setStateConversations({...stateConversations, conversations: conversations});
    };

    const handleReceivedMessage = (message, conversation_id) => {
        const conversations = [...stateConversations.conversations];
        const index = conversations.findIndex( con => con.id === conversation_id );
        const conversation = conversations[index];
        const messages = conversation.messages;
        messages.push(message);
        conversation.messages = messages;
        conversations[index] = conversation;
        setStateConversations({...stateConversations, conversations: conversations});
    };

    /**
     * Manage the modal visibility of the user list to create a new conversation.
     */
    const handleVisibilityAddConv = () => setVisibleAddConv(!visibleAddConv);

    const handleClickConversation = conversation => setConversationActive(conversation);

    useEffect(() => {
        // Call to getConversations() if is not loadded
        if (stateConversations.loadingConversations) {
            getConversations();
        };
        // Call to getUsers() if is not loadded
        if (stateUsers.loadingUsers) {
            getUsers();
        }
    }, []);

    const { conversations, loadingConversations } = stateConversations;
    const { users } = stateUsers;


    return { 
        conversations, 
        loadingConversations, 
        conversationActive, 
        users,
        handleReceivedConversation, 
        handleReceivedMessage,
        visibleAddConv,
        handleVisibilityAddConv,
        handleClickConversation
    };
};