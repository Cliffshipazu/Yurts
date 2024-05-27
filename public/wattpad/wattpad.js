exports.name = '/wattpad';
const axios = require('axios')
const cheerio = require('cheerio')

exports.index = async (req, res, next) => {
    const query = req.query.q;
axios.get(`https://www.wattpad.com/search/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const resp = [];
                 $('div.story-card-data.hidden-xxs > div.story-info ').each(function(a, b) {
                    $('ul.list-group > li.list-group-item').each(function(c,d) {
                    result = {
                    status: 200,
                    author: '@judas',
                    title: $(b).find('> div.title').text(),
                    view: $(b).find('> ul > li:nth-child(1) > div.icon-container > div > span.stats-value').text(),
                    vote: $(b).find('> ul > li:nth-child(2) > div.icon-container > div > span.stats-value').text(),
                    chapter: $(b).find('> ul > li:nth-child(3) > div.icon-container > div > span.stats-value').text(),
                    url:'https://www.wattpad.com' + $(d).find('a').attr('href'),
                    thumb: $(d).find('img').attr('src'),
                    description: $(b).find('> div.description').text().replace(/\n/g,'')
                }
                resp.push(result)
                })
                })
                return res.jsonp(resp)
            })
}