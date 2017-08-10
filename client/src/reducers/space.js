import * as types from '../constants/action-type';

const space = (state = {}, action) => {
  switch (action.type) {
  case types.JOIN_IN:
    return { users: action.payload.users };
  case types.USERS_CHANGED:
    return { ...state, users: action.payload };
  }
  return state;
};

export default space;
