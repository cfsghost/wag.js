"use strict";

var Wag = require('../../');

var app = new Wag();
app.addPath('engineDirs', __dirname + '/engines');
app.mixin([
	'web',
	'guestbook'
]);

app.run(function() {
	app.engine.listen(8000);
});
