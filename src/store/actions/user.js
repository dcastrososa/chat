import * as actionTypes from "./actionTypes";

export const authSuccess = user => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user: user
    }
};