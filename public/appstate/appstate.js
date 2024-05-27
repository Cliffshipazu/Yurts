const axios = require('axios');
const uuid = require('uuid');
const totp = require("totp-generator");
const querystring = require('querystring');
const crypto = require('crypto');

exports.name = '/getappstate';
exports.index = async (req, res, next) => {
    const { username, password, twofactor = '0', _2fa } = req.query;

    if (!username || !password) {
        return res.json({
            status: true,
            message: 'Provide username and password'
        });
    }

    try {
        const form = {
            adid: uuid.v4(),
            email: username,
            password: password,
            format: 'json',
            device_id: uuid.v4(),
            cpl: 'true',
            family_device_id: uuid.v4(),
            locale: 'en_US',
            client_country_code: 'US',
            credentials_type: 'device_based_login_password',
            generate_session_cookies: '1',
            generate_analytics_claim: '1',
            generate_machine_id: '1',
            currently_logged_in_userid: '0',
            irisSeqID: 1,
            try_num: "1",
            enroll_misauth: "false",
            meta_inf_fbmeta: "NO_FILE",
            source: 'login',
            machine_id: randomString(24),
            fb_api_req_friendly_name: 'authenticate',
            fb_api_caller_class: 'com.facebook.account.login.protocol.Fb4aAuthHandler',
            api_key: '882a8490361da98702bf97a021ddc14d',
            access_token: '350685531728%7C62f8ce9f74b12f84c123cc23437a4a32'
        };

        form.sig = encodeSig(sort(form));

        const options = {
            url: 'https://b-graph.facebook.com/auth/login',
            method: 'post',
            data: querystring.stringify(form),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-fb-friendly-name': form.fb_api_req_friendly_name,
                'x-fb-http-engine': 'Liger',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            }
        };

        axios.request(options).then(async (response) => {
            response.data.access_token_eaad6v7 = await convertToken(response.data.access_token);
            response.data.cookies = await convertCookie(response.data.session_cookies);

            res.json({
                status: true,
                message: 'Lấy thông tin thành công!',
                data: response.data
            });
        }).catch(async (error) => {
            const errorCode = error.response?.data?.error?.code;
            const errorMessage = error.response?.data?.error?.message;

            if (errorCode === 401) {
                return res.json({
                    status: false,
                    message: errorMessage
                });
            }

            if (twofactor === '0' && (!_2fa || _2fa === "0")) {
                return res.json({
                    status: false,
                    message: 'Vui lòng nhập mã xác thực 2 lớp!'
                });
            }

            const data = error.response?.data?.error?.error_data;
            try {
                _2fa = (_2fa !== "0") ? _2fa : totp(decodeURI(twofactor).replace(/\s+/g, '').toLowerCase());
            } catch (e) {
                return res.json({
                    status: false,
                    message: 'Mã xác thực 2 lớp không hợp lệ!'
                });
            }

            form.twofactor_code = _2fa;
            form.encrypted_msisdn = "";
            form.userid = data.uid;
            form.machine_id = data.machine_id;
            form.first_factor = data.login_first_factor;
            form.credentials_type = "two_factor";
            delete form.sig;
            form.sig = encodeSig(sort(form));

            const options_2fa = {
                url: 'https://b-graph.facebook.com/auth/login',
                method: 'post',
                data: querystring.stringify(form),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-fb-http-engine': 'Liger',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
                }
            };

            axios.request(options_2fa).then(async (response) => {
                response.data.cookies = await convertCookie(response.data.session_cookies);
                response.data.session_cookies = response.data.session_cookies.map((cookie) => ({
                    key: cookie.name,
                    value: cookie.value,
                    domain: cookie.domain.slice(1),
                    path: cookie.path,
                    hostOnly: false,
                    creation: new Date().toISOString(),
                    lastAccessed: new Date().toISOString()
                }));

                res.json({
                    status: true,
                    message: 'Lấy thông tin thành công!',
                    data: response.data
                });
            }).catch((error) => {
                res.json({
                    status: false,
                    message: error.response?.data
                });
            });
        });

    } catch (e) {
        res.json({
            status: false,
            message: 'Vui lòng kiểm tra lại tài khoản, mật khẩu!'
        });
    }
};

async function convertCookie(session) {
    return session.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
}

function randomString(length) {
    length = length || 10;
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

function encodeSig(data) {
    const sortedData = sort(data);
    const dataString = Object.keys(sortedData).map(key => `${key}=${sortedData[key]}`).join('');
    return md5(dataString + '62f8ce9f74b12f84c123cc23437a4a32');
}

function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}

function sort(obj) {
    return Object.keys(obj).sort().reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
    }, {});
}
