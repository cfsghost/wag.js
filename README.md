wag.js
======

Feature-oriented based application Framework.

[![NPM](https://nodei.co/npm/wag.js.png)](https://nodei.co/npm/wag.js/)

Installation
-

It's simple way to install wag.js via NPM.

```
npm install wag.js
```

Usage
-

```javascript
	var Wag = require('wag.js');

	var wag = new Wag();

	// Add web feature
	var app = wag.mixin('web');

	// Run
	app.run(function() {
		app.engine.listen(8000);
	});
```
