"use strict";

var path = require('path');
var fs = require('fs');
var async = require('async');

var Engine = require('./engine');
var Settings = require('./settings');

var Wag = module.exports = function(opts) {
	var self = this;

	self.scope = null;
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
	self.features = [];
	self.initialized = false;
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

		// Load engine
		var engine = self.loadEngine(engineName, enginePath);
	}

	if (self.reference) {
		self.engines[engineName] = engine;
		self.engineChain.push(engine);
	}

	return self;
};

Wag.prototype.loadEngine = function(engineName, enginePath) {
	var self = this;
	
	// Loading engine
	var engine = new Engine(Wag, self, engineName, enginePath);

	// Prepare and inherit old engine reference
	engine.$super = self.reference;
	engine.prepare();

	// Latest reference
	self.reference = engine.reference;

	return engine;
};

Wag.prototype.run = function(callback) {
	var self = this;

	// Initializing bootstrap engine
	var engine = self.loadEngine('Bootstrap', path.join(__dirname, 'bootstrap.js'));

	// Loading settings
	var settings = new Settings(self);
	settings.loadDirs(self.settingDirs, function() {
		self.settings = settings.settings;

		// Initializing scope
		var scope = {};
		scope.parent = self.parentScope;
		scope.self = null;
		scope.settings = settings.settings;
		scope.feature = {};
		scope.createFeature = function(featureName) {
			var feature = new Wag();

			// Set parent scope
			feature.parentScope = scope;

			// Inherit engine directories of parent
			feature.engineDirs = [];
			for (var index in self.engineDirs) {
				feature.engineDirs.push(self.engineDirs[index]);
			}

			// Inherit settings directories of parent
			feature.settingDirs = [];
			for (var index in self.settingDirs) {
				feature.settingDirs.push(self.settingDirs[index]);
			}

			// Add to feature list
			self.features.push(feature);
			scope.feature[featureName] = feature;

			return feature;
		};

		scope.getFeatureContext = function(featureName) {
			return scope.feature[featureName];
		};

		scope.getFeature = function(featureName) {
			return scope.feature[featureName].engine;
		};

		scope.$super = function(ref, method) {

			if (arguments.length == 1) {
				// Call super constructor
				ref.$super.call(scope.self, scope);
				return;
			};

			// Call methods
			return function() {
				ref.$super.prototype[method].apply(scope.self, arguments);
			};
		};

		// Create engine
		self.engine = new self.reference(scope);

		// Initializing features we used
		async.eachSeries(self.features, function(feature, next) {
			feature.run(next);
		}, function(err) {

			// Done
			self.engine.emit('ready');
			self.initialized = true;
			setImmediate(callback);
		});
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
