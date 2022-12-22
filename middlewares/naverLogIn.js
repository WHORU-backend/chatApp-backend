var request = require('request');

const naverLogIn = (req, res, next) => {
    code = req.query.code;
    state = req.query.state;

    const redirectURI = encodeURI("http://localhost:8000/users/naver/info");

    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' + process.env.NAVER_CLIENT_ID
            + '&client_secret=' + process.env.NAVER_CLIENT_SECRET
            + '&redirect_uri=' + redirectURI
            + '&code=' + code
            + '&state=' + state;
    
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':process.env.NAVER_CLIENT_ID, 'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET}
    };

    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const token = JSON.parse(body).access_token;
            const header = "Bearer " + token;
            const api_url = 'https://openapi.naver.com/v1/nid/me';
            const options_auth = {
                url: api_url,
                headers: {'Authorization': header}
            };

            request.get(options_auth, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.locals.naverInfo = JSON.parse(body).response;
                    next();
                } else {
                    if(response != null) {
                        res.status(response.statusCode).end();
                        console.log('error = ' + response.statusCode);
                    }
                }
            });
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
};
  
module.exports = naverLogIn;