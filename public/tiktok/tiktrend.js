exports.name = '/tiktrend';
exports.index = async(req, res, next) => {
var axios = require('axios');
axios({
    method: 'post',
    url: 'https://www.tikwm.com/api/feed/list?region=PH',
    data: {
  }
})
.then(function (response) {
    var data = response.data
    console.log(data)
    return res.json(data)
})
.catch(function (error) {
    return res.json({ error });
});
}