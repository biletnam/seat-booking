import * as types from '../constants/action-type';

const purchase = (state = {uid: '', sids: []}, action) => {
  switch (action.type) {
  case types.ENTER:
    return { uid: action.payload.uid, sids: [] };
  case types.SELECT:
    return { ...state, sids: [...state.sids, action.payload.sid] };
  }
  return state;
};

export default purchase;
