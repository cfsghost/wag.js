
var express = require('express');

var Web = module.exports = function() {
	var self = this;

	self.express = express();
	self.server = null;
};

Web.prototype.configure = function(callback) {
	var self = this;

	callback();
};

Web.prototype.routers = function(callback) {
	var self = this;

	self.express.get('/', function(req, res) {
		res.send('Hello! Wag Web!');
	});

	callback();
};

Web.prototype.listen = function(port) {
	var self = this;

	self.configure(function() {
		self.routers(function() {
			self.server = self.express.listen(port);
		});
	});
};
