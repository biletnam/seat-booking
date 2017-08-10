import { combineReducers } from 'redux';
import purchase from './purchase';
import seats from './seats';
import space from './space';

const rootReducer = combineReducers({
  space,
  seats,
  purchase
});

export default rootReducer;
