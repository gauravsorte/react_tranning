import {userActionConstants} from './actionTypes';

export const userDataInitiate = () => ({
    type: userActionConstants.USERS_DATA_INITIATE  
});

export const userDataSuccess = (data) => ({
    type: userActionConstants.USERS_DATA_SUCCESS,
    payload: data
});

export const userDataFailure = (error) => ({
    type: userActionConstants.UESRS_DATA_FAILURE,
    payload: error
});