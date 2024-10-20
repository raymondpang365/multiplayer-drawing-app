import {createStore, applyMiddleware, combineReducers, Store} from 'redux';
import logger from 'redux-logger';
import {createWrapper, MakeStore} from 'next-redux-wrapper';
import canvasState from "@redux/canvasState";


const reducers = combineReducers({
    canvasState
});

export type RootState = ReturnType<typeof reducers>;

const makeStore : MakeStore<Store<RootState>> = () => {
    return createStore(reducers, applyMiddleware(logger));
}

export const wrapper = createWrapper<Store<RootState>>(makeStore);
