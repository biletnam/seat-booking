import io from 'socket.io-client';
import * as types from '../constants/action-type';
import { ws_events as wsEvents } from '../../../app.json';

const socket = io('http://127.0.0.1:3000');

export const looking = sid => (dispatch, getState) => {
  socket.emit('looking', { uid: getState().purchase.uid, sid });
  return dispatch({ type: types.LOOKING, payload: { sid } });
};

export const booking = () => (dispatch, getState) => {
  socket.emit('booking', { ...getState().purchase });
  return dispatch({ type: types.BOOKING });
};

const onEvent = (event, payload) => {
  switch (event) {
    case 'join_in'      : return { type: types.JOIN_IN, payload };
    case 'users_changed': return { type: types.USERS_CHANGED, payload };
    case 'seats_changed': return { type: types.SEATS_CHANGED, payload };
  }
};

export const setupWebsocket = store => {
  wsEvents.forEach(event => {
    socket.on(event, payload => store.dispatch(onEvent(event, payload)));
  });
};
