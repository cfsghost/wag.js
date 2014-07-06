"use strict";

var util = require('util');

var Engine = module.exports = function(prototype_, parent_, engineName, enginePath) {
	var self = this;

	self.engineName = engineName;
	self.prototype_ = prototype_;
	self.parent_ = parent_;
	self.super_ = null;
	self.enginePath = enginePath;
	self.reference = require(enginePath);
	self.instance = null;
};

Engine.prototype.prepare = function() {
	var self = this;

	if (self.super_) {
		var _prototype = self.reference.prototype;

		// Inherit
		util.inherits(self.reference, self.super_);

		// Re-append prototype methods
		for (var method in _prototype) {
			self.reference.prototype[method] = _prototype[method];
		}
	}

	self.reference.Wag = self.parent_;
	self.reference.super_ = self.super_ || function() {};
	self.reference.Feature = function(featureName) {
		var feature = new self.prototype_();

		feature.engineDirs = [];
		for (var index in self.parent_.engineDirs) {
			feature.engineDirs.push(self.parent_.engineDirs[index]);
		}

		// Add to feature list
		self.parent_.features.push(feature);
		self.reference.wag.feature

		return feature;
	};
};

Engine.prototype.create = function() {
	var self = this;

	self.instance = new self.reference();

	return self.instance;
};
