export const SET_SESSION_ID = 'SET_SESSION_ID';
export const SET_SESSION_NICKNAME = 'SET_SESSION_NICKNAME'
export const SET_PLAYERS = 'SET_PLAYERS';
export const APPEND_ONLINE_PLAYER = 'APPEND_ONLINE_PLAYER'
export const REMOVE_ONLINE_PLAYER = 'REMOVE_ONLINE_PLAYER'
const initialState = {
    sessionId: null,
    sessionNickname: 'Anonymous',
    players: {},
    onlinePlayers: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION_ID:
            return {...state, sessionId: action.sessionId}
        case SET_SESSION_NICKNAME:
            return {...state, sessionNickname: action.sessionNickname}
        case SET_PLAYERS:
            return {...state, players: {...state.players, ...action.player}}
        case APPEND_ONLINE_PLAYER:
            return {...state, onlinePlayers: {...state.onlinePlayers, ...action.player }}
        case REMOVE_ONLINE_PLAYER:
            const existing = { ...state.onlinePlayers }
            delete existing[action.sessionId]
            return { ...state, onlinePlayers: existing }

        default:
            return state
    }
}