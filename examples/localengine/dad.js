var Dad = module.exports = function(scope) {
	var self = this;

	Dad.super_.call(this, scope);
};

Dad.prototype.helloDad = function() {
	var self = this;

	console.log('hello dad!');
};
