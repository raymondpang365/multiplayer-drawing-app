export enum ActionTypes {
    SET_SESSION_ID = 'SET_SESSION_ID',
    SET_SESSION_NICKNAME = 'SET_SESSION_NICKNAME',
    SET_PLAYERS = 'SET_PLAYERS',
    REMOVE_ONLINE_PLAYER = 'REMOVE_ONLINE_PLAYER'
}

export interface State {
    sessionId: string | null;
    sessionNickname: string;
    players: Record<string, any>;
}

interface SetSessionIdAction {
    type: ActionTypes.SET_SESSION_ID;
    sessionId: string;
}

interface SetSessionNicknameAction {
    type: ActionTypes.SET_SESSION_NICKNAME;
    sessionNickname: string;
}

interface SetPlayersAction {
    type: ActionTypes.SET_PLAYERS;
    player: Record<string, any>;
}

interface RemoveOnlinePlayerAction {
    type: ActionTypes.REMOVE_ONLINE_PLAYER;
    sessionId: string;
}

export type Action =
    | SetSessionIdAction
    | SetSessionNicknameAction
    | SetPlayersAction
    | RemoveOnlinePlayerAction;