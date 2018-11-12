import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/antd/dist/antd.css';

import * as serviceWorker from './serviceWorker';


const rootElement = document.getElementById('root');

ReactDOM.render(<App/>, rootElement);
serviceWorker.register();
