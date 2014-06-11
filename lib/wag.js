"use strict";

var path = require('path');
var fs = require('fs');
var async = require('async');

var Engine = require('./engine');
var Settings = require('./settings');

var Wag = module.exports = function(opts) {
	var self = this;

	self.settings = {};
	self.engine = null;
	self.engines = {};
	self.engineChain = [];
	self.engineDirs = [
		path.join(__dirname, '..', 'engines')
	];

	self.settingDirs = [
		path.join(__dirname, '..', 'settings')
	];
	self.reference = require('./base');
};

Wag.prototype.getEngine = function(engineName) {
	var self = this;

	if (self.engines[engineName])
		return self.engines[engineName];

	return null;
};

Wag.prototype.mixin = function(engineName) {
	var self = this;

	if (arguments[0] instanceof Array){
		for (var index in arguments[0]) {
			self.mixin(arguments[0][index]);
		}

		return self;
	}

	var engineName = arguments[0];

	if (self.engines[engineName])
		return self;

	// Finding specific engine
	for (var index in self.engineDirs) {

		var dirPath = self.engineDirs[index];
		var enginePath = path.join(dirPath, engineName);

		// Not found
		if (!fs.existsSync(enginePath))
			continue;

		// Loading engine
		var engine = new Engine(self, engineName, enginePath);
		engine.super_ = self.reference;
		engine.prepare();
		self.reference = engine.reference;
	}

	if (self.reference) {
		self.engines[engineName] = engine;
		self.engineChain.push(engine);
	}

	return self;
};

Wag.prototype.run = function(callback) {
	var self = this;

	// Loading settings
	var settings = new Settings(self);
	settings.loadDirs(self.settingDirs, function() {
		self.settings = settings.settings;

		// Create engine
		self.engine = new self.reference();

		setImmediate(callback);
	});

	return self;
};

Wag.prototype.addPath = function(propName, value) {
	var self = this;

	switch(propName) {
	case 'engineDirs':
		self.engineDirs.push(value);
		break;
	case 'settingDirs':
		self.settingDirs.push(value);
		break;
	}
};
