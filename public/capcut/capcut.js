const { capcut } = require('betabotz-tools');

exports.name = "/capcutdl";
exports.index = async (req, res, next) => {
    try {
        var url = req.query.link;
        if (!url) {
            res.json({error: "missing link from capcut"});
            return;
        }
        const result = await capcut(url);
      var url = result.result.video_ori;
      var title = result.result.title;
     var like = result.result.digunakan;
      var description = result.result.description;
        res.json({eurixmp4: url, title: title, like: like, description: description})
    } catch (error) {
        res.json({error: "error fetching capcut api"});
    }
};