"use strict";

var Guestbook = module.exports = function(scope) {
	var self = this;

	scope.$super(Guestbook);

	self.articles = [
		{
			title: 'What\'s Wag.js',
			text: 'Wag.js is a feature-oriented based application framework.'
		},
		{
			title: 'What\'s News',
			text: 'Guestbook example was added.'
		}
	];
};

Guestbook.prototype.routers = function(callback) {
	var self = this;

	// Call super
	self.scope.$super(Guestbook, 'routers')(function() {

		// Add route rules
		self.express.get('/', function(req, res) {
			res.render('index', {
				articles: self.articles
			});
		});

		self.express.get('/post', function(req, res) {
			res.render('post');
		});

		self.express.post('/post', function(req, res) {

			if (!req.body.title || !req.body.text) {
				res.end('Please enter title and message!');
				return;
			}

			// Save to article database
			self.articles.push({
				title: req.body.title,
				text: req.body.text
			});

			res.redirect('/');
		});

		callback();
	});
};
