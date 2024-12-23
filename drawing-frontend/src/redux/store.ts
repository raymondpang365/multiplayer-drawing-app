import {createStore, applyMiddleware, combineReducers, Store} from 'redux';
import logger from 'redux-logger';
import {createWrapper, MakeStore} from 'next-redux-wrapper';
import canvasState from "@redux/canvasState";
import registerSessionState from "@redux/registerSession/registerSessionState";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagaTask'


const reducers = combineReducers({
    canvasState,
    registerSessionState
});

export type RootState = ReturnType<typeof reducers>;

const sagaMiddleware = createSagaMiddleware();

const makeStore : MakeStore<Store<RootState>> = () => {
    const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));
    (store as any).sagaTask = sagaMiddleware.run(rootSaga);
    return store
}

export const wrapper = createWrapper<Store<RootState>>(makeStore);
