var Mom = module.exports = function(scope) {
	var self = this;

	scope.$super(Mom);
};

Mom.prototype.helloMom = function() {
	var self = this;

	console.log('hello mom!');
};
