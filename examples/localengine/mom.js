var Mom = module.exports = function(scope) {
	var self = this;

	Mom.super_.call(this, scope);
};

Mom.prototype.helloMom = function() {
	var self = this;

	console.log('hello mom!');
};
