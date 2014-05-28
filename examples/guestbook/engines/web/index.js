"use strict";

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var Web = module.exports = function() {
	var self = this;

	Web.super_.call(this);
};

Web.prototype.configure = function(callback) {
	var self = this;

	self.express.set('view engine', 'jade');
	self.express.set('views', path.join(__dirname, '..', '..', 'views'));
	self.express.use(express.static(path.join(__dirname, '..', '..', 'public')));
	self.express.use(bodyParser());

	callback();
};

Web.prototype.routers = function(callback) {

	// Clear route settings

	callback();
};
