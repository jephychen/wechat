/**
 * Created by chenshijue on 16/10/13.
 */

var https = require('https');

var getAccessToken = function (cb){
    https.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential" +
        "&appid=wxbb49660ab88935ae&secret=SECRET", function (response){
        response.on('data', function (data){
            var _data = JSON.parse(data);
            global.access_token = _data.access_token;
            console.log(new Date() + ' get access token  ' +_data.access_token);
        });
    }).on('error', function (e){
        console.log(e.message);
    });

}

module.exports = getAccessToken;