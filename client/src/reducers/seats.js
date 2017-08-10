import * as types from '../constants/action-type';

const seats = (state = [], action) => {
  switch (action.type) {
  case types.ENTER:
  case types.ON_SEAT_CHANGE:
    return action.payload.seats;
  }
  return state;
};

export default seats;
