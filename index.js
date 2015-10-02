/* jshint laxcomma : true */
var hacker = require('./lib/hackerLib')
	, open   = require('open')
	;

hacker.news(100, 5, function(err, articles)
{
	for(var i=0, l=articles.length; i<l; ++i)
	{
		open(articles[i].link);
	}
});
