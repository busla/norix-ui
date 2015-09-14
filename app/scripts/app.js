'use strict';

var React = require('react');
var _ = require('underscore');

var NoriLogin = require('./NoriLogin');
var Main = require('./Main');

React.render(<NoriLogin />, document.getElementById('login') );
//React.render(<Main url="http://localhost:1337/seminar" />, document.getElementById('main') );