import * as types from '../constants/action-type';

const purchase = (state = {uid: '', sids: []}, action) => {
  switch (action.type) {
  case types.JOIN_IN:
    return { uid: action.payload.uid, sids: [] };
  case types.LOOKING:
    return { ...state, sids: [...state.sids, action.payload.sid] };
  case types.UN_LOOKING:
    return { ...state, sids: state.sids.filter(item => item !== action.payload.sid) };
  }
  return state;
};

export default purchase;
