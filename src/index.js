import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import * as $ from 'jquery'
import Popper  from 'popper.js'
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

window.jQuery = window.$ = $;
window.Popper = Popper;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
