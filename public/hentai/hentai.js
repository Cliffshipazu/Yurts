exports.name = '/hentai';
exports.index = async(req, res, next) => {
    try {
        const girl = require('./cache/hentai.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            url: image,
            count: girl.length,
            author: 'cliff'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}