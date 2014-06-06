"use strict";

var fs = require('fs');
var path = require('path');
var async = require('async');

var Settings = module.exports = function(parent_) {
	var self = this;

	self.parent_ = parent_;
	self.settings = {};
};

Settings.prototype.loadDirs = function(settingDirs, callback) {
	var self = this;

	async.eachSeries(settingDirs, function(dirPath, next) {
		self.loadDir(dirPath, next);
	}, function() {
		callback();
	});
};

Settings.prototype.loadDir = function(dirPath, callback) {
	var self = this;

	fs.readdir(dirPath, function(err, files) {
		async.eachSeries(files, function(filename, next) {
			var extname = path.extname(filename);

			// It's not json file
			if (extname != '.json') {
				next();
				return;
			}

			var basename = path.basename(filename, extname);

			self.load(basename, path.join(dirPath, filename), next);
		}, function() {
			callback();
		});
	});
};

Settings.prototype.load = function(domain, filePath, callback) {
	var self = this;

	fs.readFile(filePath, function(err, content) {
		var setting = JSON.parse(content);

		self.settings[domain] = setting;

		callback();
	});
};
