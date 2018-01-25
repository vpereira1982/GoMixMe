import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const Index = (props) => {
  return (
    <Provider store={createStore(reducers)}>
      <App />
    </Provider>
  )
}

ReactDOM.render(<Index />, document.getElementById('app'));
