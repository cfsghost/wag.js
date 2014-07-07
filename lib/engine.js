"use strict";

var util = require('util');

var Engine = module.exports = function(prototype_, parent_, engineName, enginePath) {
	var self = this;

	self.engineName = engineName;
	self.prototype_ = prototype_;
	self.parent_ = parent_;
	self.$super = null;
	self.enginePath = enginePath;
	self.reference = require(enginePath);
	self.instance = null;
};

Engine.prototype.prepare = function() {
	var self = this;

	if (self.$super) {
		var _prototype = self.reference.prototype;

		// Inherit
		util.inherits(self.reference, self.$super);

		// Re-append prototype methods
		for (var method in _prototype) {
			self.reference.prototype[method] = _prototype[method];
		}
	}

	self.reference.Wag = self.parent_;
	self.reference.$super = self.$super || function() {};
};

Engine.prototype.create = function() {
	var self = this;

	self.instance = new self.reference();

	return self.instance;
};
