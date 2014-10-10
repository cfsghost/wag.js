var Dad = module.exports = function(scope) {
	var self = this;

	scope.$super(Dad);
};

Dad.prototype.helloDad = function() {
	var self = this;

	console.log('hello dad!');
};
