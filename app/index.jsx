// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
import './css/base';
import './components/Portfolio/style';

// Some ES6+ features require the babel polyfill
// More info here: https://babeljs.io/docs/usage/polyfill/
// Uncomment the following line to enable the polyfill
// require("babel/polyfill");

import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application';
import Portfolio from './components/Portfolio';
import sujets from './portfolio-data-sujets.json';
//import details from './portfolio-data-details.json';

console.log('sujets', sujets.sujets);
//ReactDOM.render(<Application />, document.getElementById('app'));
ReactDOM.render(<Portfolio data = {sujets.sujets} />, document.getElementById('app'));
