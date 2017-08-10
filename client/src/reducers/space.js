import * as types from '../constants/action-type';

const space = (state = {}, action) => {
  switch (action.type) {
  case types.ENTER:
    return { users: action.payload.users };
  case types.ON_USER_CHANGE:
    return { ...state, users: action.payload.users };
  }
  return state;
};

export default space;
