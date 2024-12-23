import {RegisterSessionAction} from "@redux/registerSession/registerSessionState";

export enum ActionTypes {
    SET_SESSION_ID = 'SET_SESSION_ID',
    SET_SESSION_NICKNAME = 'SET_SESSION_NICKNAME',
    SET_PLAYER = 'SET_PLAYER',
    REMOVE_ONLINE_PLAYER = 'REMOVE_ONLINE_PLAYER',
    SET_ALL_PLAYERS = 'SET_ALL_PLAYERS'
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

interface SetPlayerAction {
    type: ActionTypes.SET_PLAYER;
    player: Record<string, any>;
}

interface SetAllPlayersAction {
    type: ActionTypes.SET_ALL_PLAYERS;
    players: Record<string, any>;
}

interface RemoveOnlinePlayerAction {
    type: ActionTypes.REMOVE_ONLINE_PLAYER;
    sessionId: string;
}

export type Action =
    | SetSessionIdAction
    | SetSessionNicknameAction
    | SetPlayerAction
    | SetAllPlayersAction
    | RemoveOnlinePlayerAction
    | RegisterSessionAction;