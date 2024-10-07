export const SET_LAST_VISITED_REPORT='SET_LAST_VISITED_REPORT'
export const CLEAR_COOKIES='CLEAR_COOKIES'
const initialState = {
    siteId: null,
    reportId: null
};

export default (state = initialState, action)=> {
    switch (action.type) {
        case SET_LAST_VISITED_REPORT:
            return {
                ...state, siteId: action.siteId, reportId: action.reportId
            }
        default:
            return state
    }
}