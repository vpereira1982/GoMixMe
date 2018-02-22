import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const Index = (props) => {
  return (
    <Provider store={createStoreWithMiddleware(reducers)}>
      <div>
        <App />
      </div>
    </Provider>
  )
}

ReactDOM.render(<Index />, document.getElementById('app'));