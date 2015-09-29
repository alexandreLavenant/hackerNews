#!/usr/bin/env node
/* jshint laxcomma:true, loopfunc:true*/
var request		= require('request')
	,cheerio	= require('cheerio')
	,open		= require('open')
	,url = "https://news.ycombinator.com/"
	,minimumScore = 100
	,limitArticle = 10
	/**
	 * open the news from hackerNews website
	 */
	,news = function()
	{
		//get the content of hackerNews website
		request(url, function(error, response, body)
		{
			var articles = [];
			if (!error && response.statusCode == 200)
			{
				var $ = cheerio.load(body);
				$('span.deadmark').each(function(index, element)
				{
					var title = $(this).next().text();
					var link = $(this).next().attr('href');
					var scoreStr = $(this).parent().parent().next().find($('.score')).text();
					var score = parseInt(scoreStr,10);
					if (score > minimumScore && !isNaN(score))
					{
						var regex = /http/;
						if(regex.test(link)) articles.push({"link" : link, "title" : title, "score":score});
					}
				})
				;
				//open hacker news links
				for (var i = 0; i < articles.length; i++)
				{
					if(i > limitArticle) break;
					console.log('opening score:', articles[i].score, 'link:',articles[i].title);
					open(articles[i].link);
				}
			}
		})
		;
	}
	;
exports.news = news;
