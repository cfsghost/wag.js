"use strict";

var Wag = require('../../');

var wag = new Wag();

var app = wag.mixin('web');

app.run(function(feature) {
	feature.listen(8000);
});
