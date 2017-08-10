import * as types from '../constants/action-type';

const seats = (state = [], action) => {
  switch (action.type) {
  case types.JOIN_IN:
    return action.payload.seats;
  case types.SEATS_CHANGED:
    return action.payload;
  }
  return state;
};

export default seats;
