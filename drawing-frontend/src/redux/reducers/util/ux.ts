import {HYDRATE} from "next-redux-wrapper";

export const SET_UX_VALUE='SET_UX_VALUE';

const initialState = {
  profileActive: false,
  profileModalActive: false,
  abnormalError: null
};

export default (state = initialState, action)=> {
  switch (action.type) {
    case HYDRATE:
      console.log(action)
      return {...state, ...action.payload.ux};
    case SET_UX_VALUE:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};
