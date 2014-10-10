"use strict";

var Wag = require('../../');

var wag = new Wag();
var app = wag.mixin('web');
app.addPath('settingDirs', __dirname + '/settings');

app.run(function(feature) {
	console.log('Server listening on ' + feature.scope.settings.web.port);
	feature.listen(feature.scope.settings.web.port);
});
