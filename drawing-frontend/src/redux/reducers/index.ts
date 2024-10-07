import {combineReducers} from 'redux'

import socket from "@redux/reducers/util/socket"
import cookie from "@redux/reducers/util/cookie";
import browserSession from "@redux/reducers/util/browserSession"
import ux from "@redux/reducers/util/ux"

import draw from "@redux/reducers/draw"


// @ts-ignore


const reducers = combineReducers({
    cookie,
    ux,
    socket,
    browserSession,
    ...draw
});

export default reducers

export type RootState = ReturnType<typeof reducers>;
