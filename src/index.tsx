import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import './index.css';
import './fonts/fonts.css';
import { Provider } from "react-redux";
import { store } from "./services/store"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
