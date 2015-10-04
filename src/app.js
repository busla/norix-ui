'use strict';
require('./sass/main.scss');
var React = require('react');
var _ = require('underscore');

var NoriLogin = require('./NoriLogin');
var Main = require('./Main');

React.render(<Main />, document.getElementById('main') );
//React.render(<Example />, document.getElementById('swiper') );