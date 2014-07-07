"use strict";

var Bootstrap = module.exports = function(scope) {
	var self = this;

	self.scope = scope;
	self.scope.self = self;

	Bootstrap.$super.call(this, scope);
};
