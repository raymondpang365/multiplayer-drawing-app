import {modalTypes, SET_UX_VALUE} from "@redux/reducers/util/ux";

export const CONNECTION_ERROR = 'CONNECTION_ERROR';
export const UNCAUGHT_SERVER_ERROR = 'SERVER_ERROR';
import {call, all, select, put, takeEvery} from "redux-saga/effects";
import {LOGOUT, logoutUser} from "@redux/actions/security/auth";


export function* handleErrors(actionData = null, err) {

    const whiteList = {
        EMAIL_UNVERIFIED: 'EMAIL_UNVERIFIED',
        USER_EXISTED: 'USER_EXISTED',
        EASY_PASSWORD: 'EASY_PASSWORD',
        PROPERTY_NOT_FOUND: 'PROPERTY_NOT_FOUND',
        LOGIN_FAILURE: 'LOGIN_FAILURE',
        USER_NOT_FOUND: 'USER_NOT_FOUND',
        INVALID_JWT_TOKEN: 'INVALID_JWT_TOKEN'
    };

    if (typeof err.response !== 'undefined'
        && typeof err.response.data !== 'undefined'
    ) {
        const e = err.response.data;
        const code = e.code;
        if (!(code in whiteList)) {
            yield all([
                put({type: SET_UX_VALUE, key: 'abnormalError', value: err.response.data.errors}),
                put({type: SET_UX_VALUE, key: 'modalType', value: modalTypes.INVALID})
            ])
        }
        if (code === 'EMAIL_UNVERIFIED') {
            yield put({type: SET_UX_VALUE, key: 'modalType', value: modalTypes.ACTION_NOT_VERIFIED})
        }

        yield put({
            ...actionData,
            err: err.response.data
        })

        if (code === 'INVALID_JWT_TOKEN' || code === 'USER_NOT_FOUND') {
            yield call(logoutUser)
        }

    } else if (typeof err.response !== 'undefined') {
        console.log(err.response);
        console.log(err.response.data);
        const customErr = [{
            code: UNCAUGHT_SERVER_ERROR,
            msg: err.response.data,
            internal: true
        }]
        yield put({
            ...actionData,
            err: customErr
        })

        yield all([
            put({type: SET_UX_VALUE, key: 'abnormalError', value: customErr}),
            put({type: SET_UX_VALUE, key: 'modalType', value: modalTypes.INVALID})
        ])

    } else {
        const customErr = [{
            code: CONNECTION_ERROR,
            msg: err.message
        }];

        yield put({
            ...actionData,
            err: customErr
        })
        yield all([
            put({type: SET_UX_VALUE, key: 'abnormalError', value: customErr}),
            put({type: SET_UX_VALUE, key: 'modalType', value: modalTypes.INVALID})
        ])
    }
}
