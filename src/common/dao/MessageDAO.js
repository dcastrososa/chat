import BusinessDAO from "./BusinessDAO";

class MessageRaw extends BusinessDAO {
    constructor() {
        super("messages");
    };
}

export const MessageDAO = new MessageRaw();