
var express = require('express');

var Web = module.exports = function(scope) {
	var self = this;

	Web.super_.call(this, scope);

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

	var _port = port || Web.Wag.settings.web.port;

	self.configure(function() {
		self.routers(function() {
			self.server = self.express.listen(_port);
		});
	});
};
