import BusinessDAO from "./BusinessDAO";

class ConversationDAORaw extends BusinessDAO {
    constructor() {
        super("conversations");
    };
}

export const ConversationDAO = new ConversationDAORaw();