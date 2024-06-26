const axios = require("axios");
const qs = require("qs");

exports.name = "/shield";
exports.index = async function (req, res) {
  try {
    const token = req.query.token;
    const enable = req.query.enable;

    const uid = await getUserId(token);

    const data = qs.stringify({
      variables: JSON.stringify({
        "0": {
          is_shielded: enable,
          session_id: "9b78191c-84fd-4ab6-b0aa-19b39f04a6bc",
          actor_id: uid,
          client_mutation_id: "b0316dd6-3fd6-4beb-aed4-bb29c5dc64b0",
        },
      }),
      method: "post",
      doc_id: "1477043292367183",
      query_name: "IsShieldedSetMutation",
      strip_defaults: "true",
      strip_nulls: "true",
      locale: "en_US",
      client_country_code: "US",
      fb_api_req_friendly_name: "IsShieldedSetMutation",
      fb_api_caller_class: "IsShieldedSetMutation",
    });

    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `OAuth ${token}`,
      },
    };

    const response = await axios.post(
      'https://graph.facebook.com/graphql',
      data,
      options
    );

    const Data = response.data;
    res.json({ success: true, data: Data });
    console.log(Data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

async function getUserId(token) {
  try {
    const url = `https://graph.facebook.com/me?access_token=${token}`;
    const response = await axios.get(url);
    const parsedData = await response.data;
    return parsedData.id;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    throw error;
  }
}
