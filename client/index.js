import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import jwtDecode from 'jwt-decode'
import { setCurrentUser } from './store'
import * as serviceWorker from './service-worker';

const token = localStorage.getItem('token');
if (token) {
	const decoded = jwtDecode(token);
			// Set current user
			store.dispatch(setCurrentUser(decoded));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

serviceWorker.register();
