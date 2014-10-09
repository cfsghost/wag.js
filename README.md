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

Here is an example to show how to build up a web service with wag.js.

```javascript
var Wag = require('wag.js');

var wag = new Wag();

// Add web feature engine
var app = wag.mixin('web');

// Run
app.run(function() {
	app.engine.listen(8000);
});
```
