import {ActionTypes, Action, State} from "@redux/type";

const initialState : State = {
    sessionId: null,
    sessionNickname: 'Anonymous',
    players: {}
};

export default (state = initialState, action : Action): State => {
    switch (action.type) {
        case ActionTypes.SET_SESSION_ID:
            return {...state, sessionId: action.sessionId}
        case ActionTypes.SET_SESSION_NICKNAME:
            return {...state, sessionNickname: action.sessionNickname}
        case ActionTypes.SET_ALL_PLAYERS:
            return {...state, players: action.players}
        case ActionTypes.REMOVE_ONLINE_PLAYER:
            const existing = { ...state.players }
            delete existing[action.sessionId]
            return { ...state, players: existing }
        case ActionTypes.SET_PLAYER:
            return {...state, players: {...state.players, ...action.player}}

        default:
            return state
    }
}