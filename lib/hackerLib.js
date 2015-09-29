/* jshint laxcomma:true, loopfunc:true*/

var request		= require('request')
	,cheerio	= require('cheerio')
	,open		= require('open')
	,url = "https://news.ycombinator.com/"
	/**
	 * open the news from hackerNews website
	 */
	,news = function(minimumScore, limitArticle)
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
					var title = $(this).next().text()
						, link = $(this).next().attr('href')
						, scoreStr = $(this).parent().parent().next().find($('.score')).text()
						, score = parseInt(scoreStr,10)
						;

					if (score > minimumScore && !isNaN(score))
					{
						if(/http/.test(link)) articles.push({"link" : link, "title" : title, "score":score});
					}
				})
				;
				//open hacker news links
				for (var i = 0; i < articles.length; i++)
				{
					if(i >= limitArticle) break;
					console.log('opening link:', articles[i].title, 'score:',articles[i].score);
					open(articles[i].link);
				}
			}
		})
		;
	}
	;

exports.news = news;
