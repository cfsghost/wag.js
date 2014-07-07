"use strict";

var events = require('events');
var util = require('util');

var Base = module.exports = function(scope) {
	var self = this;

	self.feature = {};
};

util.inherits(Base, events.EventEmitter);
