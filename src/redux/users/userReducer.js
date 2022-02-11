import {userActionConstants} from './actionTypes';

const initialState = {
    loader: false,
    userData: [],
    error: ""
};

const userReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case userActionConstants.USERS_DATA_INITIATE:{
            return {
                ...state,
                loader: true,
                userData: [],
                error: ""
            }
        }

        case userActionConstants.USERS_DATA_SUCCESS: {
            return {
                ...state,
                loader: false,
                userData: payload,

            }
        }

        case userActionConstants.UESRS_DATA_FAILURE: {
            return {
                ...state,
                loader:false,
                error: payload
            }
        } 
    
        default:
            return state;
    }
}

export default userReducer;
