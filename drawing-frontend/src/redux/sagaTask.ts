import registerSessionAction from "@redux/registerSession/registerSessionAction";
import {all} from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        ...registerSessionAction
    ])
}