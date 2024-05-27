const request = require('request');

exports.name = '/api/login';
exports.index = async (req, res, next) => {
    const { email, password } = req.query;

    const par = {
        "adid": "e3a395f9-84b6-44f6-a0ce-fe83e934fd4d",
        "email": email,
        "password": password,
        "format": "json",
        "device_id": "67f431b8-640b-4f73-a077-acc5d3125b21",
        "cpl": "true",
        "family_device_id": "67f431b8-640b-4f73-a077-acc5d3125b21",
        "locale": "en_US",
        "client_country_code": "US",
        "credentials_type": "device_based_login_password",
        "generate_session_cookies": "1",
        "generate_analytics_claim": "1",
        "generate_machine_id": "1",
        "currently_logged_in_userid": "0",
        "irisSeqID": "1",
        "try_num": "1",
        "enroll_misauth": "false",
        "meta_inf_fbmeta": "NO_FILE",
        "source": "login",
        "machine_id": "KBz5fEj0GAvVAhtufg3nMDYG",
        "fb_api_req_friendly_name": "authenticate",
        "fb_api_caller_class": "com.facebook.account.login.protocol.Fb4aAuthHandler",
        "api_key": "882a8490361da98702bf97a021ddc14d",
        "access_token": "350685531728|62f8ce9f74b12f84c123cc23437a4a32"
    };

    request.get({ url: "https://b-api.facebook.com/method/auth.login", qs: par }, (error, response, body) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(JSON.parse(body));
    });
};
