const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
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
  const res = await fetch("https://indown.io/", {
    headers: {
      "accept": "*/*",
      "accept-language": "en-PH,en-US;q=0.9,en;q=0.8",
      "sec-ch-ua": "\"Not A(Brand\";v=\"24\", \"Chromium\";v=\"110\", \"Microsoft Edge Simulate\";v=\"110\", \"Lemur\";v=\"110\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Linux\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "no-cors",
      "sec-fetch-site": "same-origin",
      "cookie": "FCNEC=%5B%5B%22AKsRol9o2wT4Q92T28lWSb8NHufDecWfE6-X3mgxkWT6qpitgreRTmsLq5GhF2GQQScIvelgKqQqtiD9zxk0HrnCfrSZI77Z31aApqJJnV3WA-IEEe_olVbwcIcCPv-VbmrN3BT1W44TRHQcXzVYQQqYNN3CODz75A%3D%3D%22%5D%2Cnull%2C%5B%5B2%2C%22%5Bnull%2C%5Bnull%2C11%2C%5B1717699428%2C711280000%5D%5D%5D%22%5D%5D%5D; _ga=GA1.2.460344362.1717699421; _gid=GA1.2.1914071531.1717868165; cf_clearance=SLcK0ZMAVTVHqm_vSQ1LqYA.PM98K0LVc_3ohO9lJVw-1717868166-1.0.1.1-LKqHCY_AquI6091B6zoHSasXb95dbpT2zJVVMN6BvsZgWnxmXSYppcVFxm.lqPDCawAIV_Y9keZV4CyF_sdP3w; _ga_DGBNK67EMB=GS1.1.1717868164.5.0.1717868536.0.0.0; XSRF-TOKEN=eyJpdiI6Im5KUEVXM1lRSXVqcTNWOStqbW5VaUE9PSIsInZhbHVlIjoia3ZQVnhKMEFuMk5yb0ozL3NLbFJYZmRsQkU0Y2lWWXJGME5LcnBDcVpUN0FITzY3Nk9oUGx2bExROFhJcWlDZTlGS3ArWlVqbHcwL2w0TDRvekduY1dSN2Q3WjhabS8rT1cyYUFLOEE0Si9XMXphSGlia2xNQTBUd25mRit1Y3giLCJtYWMiOiI2MDhiYmIxMTgzMGFlZjYyMTQ2YjY5ZmNjZDViYmI0MGY1YWUxYzUyOWNmNzRiODM0Y2YyMjBlZGQ1YjlmNDBjIiwidGFnIjoiIn0%3D; indown_session=eyJpdiI6IkppVUV6dEFjWGoxc3FRMXluWnJxNFE9PSIsInZhbHVlIjoiOCtmcSsvSTdHYW1YS1JmTDF0TGhkM0czajczTVpVY01GSnFiV0FmZ3Nwem1yNEY0clhXU1luOFUvays1SndVcE1HMVFQaTNzYVRySGpTbDFQdkd1Ni9WNTRVUStmbVZtNnY1ajExejljRDFYMGRjbWRaUFBxc2JkU2UzRFVuSzIiLCJtYWMiOiJmODgxYmYyMTk2ZTlhZWQ4M2UyMTg0NzU4Y2I4M2QzMDQ5NjQ4OGU3OWU3ZDNmOTE5MzY3NDQ2MGU2YWZhZTc4IiwidGFnIjoiIn0%3D; __gads=ID=1faf348b137a71e7:T=1717699420:RT=1717869977:S=ALNI_MbM3OaAcYmEJIe2zjL3UCQfgj5jQA; __gpi=UID=00000e42ab65c508:T=1717699420:RT=1717869977:S=ALNI_MZMyL78xcwvZzAznC1Tv-H8mYgDSg; __eoi=ID=8d5fed9f37a4d282:T=1717699420:RT=1717869977:S=AA-AfjaB-VWb1PsAXD5QDrNtc92j"
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    method: "GET"
  });

  const cookies = res.headers.raw()['set-cookie'];
  const setCookie = cookies ? cookies.join('; ') : "";

  const html = await res.text();
  const _$ = cheerio.load(html);
  const referer = _$("input[name=referer]").val();
  const locale = _$("input[name=locale]").val();
  const _token = _$("input[name=_token]").val();
  const response = await fetch("https://indown.io/download", {
    method: "POST",
    body: new URLSearchParams({
      link: url,
      referer,
      locale,
      _token,
    }),
    headers: {
      cookie: setCookie,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  const data = await response.text();
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
