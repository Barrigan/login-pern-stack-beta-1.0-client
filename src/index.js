import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import { Router } from 'react-router-dom'
import history from './history';
import { loadUserSession } from './features/user/authSlice'


function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    console.log("Error Loading: ", e)
    return undefined
  }
}

let lsState = loadFromLocalStorage()
lsState && lsState.auth && lsState.auth.user && store.dispatch(loadUserSession({
  user: {
    id: lsState.auth.user.user.id,
    name: lsState.auth.user.user.name
  }
}))


//console.log("Store State Loaded from LS: ", store.getState)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);