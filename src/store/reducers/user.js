import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    user: null,
    verifySesion: false
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        verifySesion: true
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        default: return state;
    };
};

export default reducer;

// helper

export const updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties
    }
}