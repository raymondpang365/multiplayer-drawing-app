export const SET_SOCKET_ID ='SET_SOCKET_ID';

const initialState = {
  id: null
};


export default (state, action) => {

  if (typeof state === 'undefined') {
    state = initialState
  }

  if (action.type === SET_SOCKET_ID) {
    return {
      id: action.id
    };
  }
  else{
    return state
  }
}
