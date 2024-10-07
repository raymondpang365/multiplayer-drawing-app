export const SET_COOKIE='SET_COOKIE'
export const CLEAR_COOKIES='CLEAR_COOKIES'
const initialState = {
    token: null,
    info: null
};

export default (state = initialState, action)=> {
    switch (action.type) {
        case SET_COOKIE:
            return {
                ...state, [action.key]: action.value
            }
        case CLEAR_COOKIES:
            return initialState
        default:
            return state
    }
}