import axios from "axios";
import { IP, HEADERS } from "./../../system/Config";

export default class BusinessDAO {
    constructor(collection) {
        this.collection = collection;
    };

    /**
     * @returns {Promise}
     */
    findAll = () => axios.get(`${IP}/${this.collection}`, { headers: HEADERS });

    /**
     * @param {Number|String} id
     * @returns {Promise}
     */
    findOne = id => axios.get(`${IP}/${this.collection}/${id}`, { headers: HEADERS });

    /**
     * @param {object} data
     * @returns {Promise}
     */
    save = data => axios.post(`${IP}/${this.collection}`, data, { headers: HEADERS });
}
