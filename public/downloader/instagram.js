const axios = require("axios");
const cheerio = require("cheerio");
const { URLSearchParams } = require("url");

exports.name = "/insta";
exports.index = async function (req, res) {
  const url = req.query.url;
  const msg = {
    paramurl: {
      status: false,
      creator: author,
      message: "Missing Parameter URL!",
    },
    nodata: {
      status: false,
      creator: author,
      message: "Data not found!",
    },
  };

  if (!url) return res.json(msg.paramurl);

  try {
    const data = await igdl(url);
    if (!data) {
      return res.json(msg.nodata);
    }

    res.json({
      status: true,
      creator: author,
      result: data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function igdl(url) {
  const res = await axios("https://indown.io/");
  const _$ = cheerio.load(res.data);
  const referer = _$("input[name=referer]").val();
  const locale = _$("input[name=locale]").val();
  const _token = _$("input[name=_token]").val();
  const { data } = await axios.post(
    "https://indown.io/download",
    new URLSearchParams({
      link: url,
      referer,
      locale,
      _token,
    }),
    {
      headers: {
        cookie: res.headers["set-cookie"].join("; "),
      },
    }
  );
  const $ = cheerio.load(data);
  const result = [];
  const __$ = cheerio.load($("#result").html());
  __$("video").each(function () {
    const $$ = $(this);
    result.push({
      type: "video",
      thumbnail: $$.attr("poster"),
      url: $$.find("source").attr("src"),
    });
  });
  __$("img").each(function () {
    const $$ = $(this);
    result.push({
      type: "image",
      url: $$.attr("src"),
    });
  });

  return result;
}

const author = "cliff";
