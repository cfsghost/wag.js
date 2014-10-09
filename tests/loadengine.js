"use strict";

var test = require('tape');
var Wag = require('../');
var wag = new Wag();

test('Loading engine', function(t) {
	t.plan(4);

	var app = wag.mixin([
		'./asserts/dad.js',
		'./asserts/mom.js'
	]);
	t.pass('Added engines');

	app.run(function() {
		t.pass('Initialized engine');

		app.engine.helloDad();
		t.pass('Called method in dad.js');

		app.engine.helloMom();
		t.pass('Called method in mom.js');
	});
});
