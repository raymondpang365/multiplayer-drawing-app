import apiEngine from "@utils/api/apiEngine";
import {REGISTER_SESSION_STATUS} from "@redux/registerSession/registerSessionState";
import {all, select, put, call, fork, takeEvery} from "redux-saga/effects"
import { GET } from "@utils/api/methods"
import config from "@config"
import {RootState} from "@redux/store";
import {ActionTypes} from "@redux/type";

export const REGISTER_SESSION = "REGISTER_SESSION"

const api = () => apiEngine(
    GET,
    `${config.apiUrl}/register-session`
)


function* registerSessionAction() {
    const readyStatus = yield select((state: RootState) => state.registerSessionState.readyStatus)
    if (readyStatus !== REGISTER_SESSION_STATUS.REQUESTING) {
        yield put({type: "REGISTER_SESSION_STATUS_REQUESTING"});
    }
    try {
        const r = yield call(api);
        yield all([
            put({type: "REGISTER_SESSION_STATUS_SUCCESS"}),
            put({type: ActionTypes.SET_SESSION_ID, sessionId: r.data})
            ])

    } catch (err) {
        console.log(err);
        console.log(typeof err);
        console.log(JSON.stringify(err));
        yield  put({type: "REGISTER_SESSION_STATUS_FAILURE"})
    }
}

export default[
    takeEvery(REGISTER_SESSION, registerSessionAction)
]