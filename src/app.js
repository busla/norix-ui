'use strict';
require('./sass/main.scss');
var React = require('react');
var _ = require('underscore');

var NoriLogin = require('./NoriLogin');
var Main = require('./Main');

React.render(<NoriLogin />, document.getElementById('navbar') );
//React.render(<Example />, document.getElementById('swiper') );