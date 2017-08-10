import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './app';
import * as actions from './actions';

const store = createStore(rootReducer, applyMiddleware(thunk));
actions.setupWebsocket(store);

render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'));
