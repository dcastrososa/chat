import BusinessDAO from "./BusinessDAO";
import { IP } from "./../../system/Config";
import axios from "axios";

class UserDAORaw extends BusinessDAO {
    constructor() {
        super("users");
        this.auth = "auth";
    };

    /**
     * @param {object} data
     * @return {Promise}
     */
    login = data => axios.post(`${IP}/${this.auth}/sign_in`, data);

    /**
     * @param {object} data
     * @return {Promise}
     */
    register = data => axios.post(`${IP}/${this.auth}`, data );
}

export const UserDAO = new UserDAORaw();
