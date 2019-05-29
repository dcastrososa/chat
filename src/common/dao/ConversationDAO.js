import BusinessDAO from "./BusinessDAO";
import axios from "axios";
import { IP, HEADERS } from "./../../system/Config";

class ConversationDAORaw extends BusinessDAO {
    constructor() {
        super("conversations");
    };

    /**
     * List of Users for new conversations of user loggued
     * @returns {Promise}
     */
    usersForNewConversations = () => axios.get(`${IP}/${this.collection}/users/new`, { headers: HEADERS });
}

export const ConversationDAO = new ConversationDAORaw();