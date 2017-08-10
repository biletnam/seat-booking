import io from 'socket.io-client'
import * as types from '../constants/action-type';

const socket = io('http://127.0.0.1:3000');

const onEnter = data => {
  return {
    type: types.ENTER,
    payload: { ...data }
  };
};

const onSeatChange = data => {
  return {
    type: types.ON_SEAT_CHANGE,
    payload: { seats: data }
  };
};

const onUserChange = data => {
  return {
    type: types.ON_USER_CHANGE,
    payload: { users: data }
  };
};

export const booking = sid => (dispatch, getState) => {
  socket.emit('booking', { ...getState().purchase });
};

export const select = sid => (dispatch, getState) => {
  socket.emit('select', { uid: getState().purchase.uid, sid });
  dispatch({
    type: types.SELECT,
    payload: { sid }
  });
};

export const setupWebsocket = store => {
  socket.on('enter', payload => store.dispatch(onEnter(payload)));
  socket.on('seatChange', payload => store.dispatch(onSeatChange(payload)));
  socket.on('userChange', payload => store.dispatch(onUserChange(payload)));
};
