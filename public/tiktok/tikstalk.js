exports.name = "/tikstalk"; exports.index =  async (req, res, next) => {
  var user = req.query.username;

  if (!user) return res.json({ error: "missing user query!!" });

  var axios = require("axios");

  axios({
    method: "post",

    url: "https://www.tikwm.com/api/user/info?unique_id=@",

    data: {
      unique_id: user,
    },
  })
    .then(function (response) {
      var data = response.data.data;

      console.log(data);

      return res.json({
        id: data.user.id,

        nickname: data.user.uniqueId,

        username: data.user.nickname,

        avatarLarger: data.user.avatarLarger,

        signature: data.user.signature,

        secUid: data.user.secUid,

        relation: data.user.relation,

        bioLink: data.user.bioLink,

        videoCount: data.stats.videoCount,

        followingCount: data.stats.followingCount,

        followerCount: data.stats.followerCount,

        heartCount: data.stats.heartCount,

        diggCount: data.stats.diggCount,
      });
    })

    .catch(function (error) {
      return res.json({ error });
    });
};