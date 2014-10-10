"use strict";

var Wag = require('../../');

var wag = new Wag();

var app = wag.mixin([
	'./dad.js',
	'./mom.js'
]);

app.run(function(feature) {
	feature.helloDad();
	feature.helloMom();
});
