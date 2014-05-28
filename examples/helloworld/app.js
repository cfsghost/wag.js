"use strict";

var Wag = require('../../');

var wag = new Wag();

var app = wag.mixin('web');

app.run(function() {
	app.engine.listen(8000);
});
