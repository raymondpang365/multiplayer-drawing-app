import {ActionTypes} from "@redux/type";
import {Action} from "redux";


export interface RegisterSessionState {
    readyStatus: REGISTER_SESSION_STATUS
}

export enum REGISTER_SESSION_STATUS {
    INVALID,
    REQUESTING,
    SUCCESS,
    FAILURE
}

const initialState : RegisterSessionState = {
    readyStatus: REGISTER_SESSION_STATUS.INVALID
}

export interface RegisterSessionAction {
    type: REGISTER_SESSION_STATUS
}

export default (state = initialState, action : Action): RegisterSessionState => {
    if(typeof state === 'undefined'){
        state = initialState
    }

    switch (action.type) {
        case REGISTER_SESSION_STATUS.REQUESTING:
            return {
                readyStatus: REGISTER_SESSION_STATUS.REQUESTING
            };
        case REGISTER_SESSION_STATUS.SUCCESS:
            return {
                readyStatus: REGISTER_SESSION_STATUS.SUCCESS,
            }

        default:
            return state;
    }
};