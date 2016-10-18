var express = require('express');
var https = require('https');
var router = express.Router();
var request = require('request');

/* GET wx server ip. */
router.get('/getserverip', function(req, res, next) {
  https.get("https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=" + global.access_token,
      function (response){
        response.on('data', function (data){
          res.send(JSON.parse(data).ip_list);
        });
      }).on('error', function (e){
        res.send(e.message);
      });
});

/* add click menu. */
router.get('/addmenu', function(req, res, next) {
  var menuInfo =  {
    "button":[
      {
        "type":"click",
        "name":"今日歌曲",
        "key":"V1001_TODAY_MUSIC"
      },
      {
        "name":"菜单",
        "sub_button":[
          {
            "type":"view",
            "name":"搜索",
            "url":"http://www.soso.com/"
          },
          {
            "type":"view",
            "name":"视频",
            "url":"http://v.qq.com/"
          },
          {
            "type":"click",
            "name":"赞一下我们",
            "key":"V1001_GOOD"
          }]
      }]
  };
  opts = {
    url: "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + global.access_token,
    form: JSON.stringify(menuInfo),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  request.post(opts, function(err, respone, body){
    if (err) {
      console.log(err);
      res.send(err);
    }else {
      console.log(body);
      res.send(body);
    }
  });
});

router.get('/getmenu', function (req, res, next){
  var opts = {
    url: "https://api.weixin.qq.com/cgi-bin/menu/get?access_token=" + global.access_token,
  };
  request.get(opts, function (err, response, body){
    if (err) {
      console.log(err);
      res.send(err);
    }else {
      console.log(body);
      res.send(body);
    }
  });
});

router.get('/callwx', function (req, res, next){
  var data =
      '<xml>' +
      '<ToUserName><![CDATA[gh_2582e34371fb]]></ToUserName> ' +
      '<FromUserName><![CDATA[ojEePwJgU_RMkjQdSfqGMXY2Ujvw]]></FromUserName> ' +
      '<CreateTime>1476760586</CreateTime> ' +
      '<MsgType><![CDATA[event]]></MsgType> ' +
      '<Event><![CDATA[subscribe]]></Event> ' +
      '<EventKey><![CDATA[]]></EventKey> ' +
      '</xml>';
  var opts = {
    url: "http://127.0.0.1:3000/wx",
    form: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length':data.length
    }
  };
  request.post(opts, function (err, response, body){
    if (err) {
      console.log(err);
      res.send(err);
    }else {
      console.log(body);
      res.send(body);
    }
  });
});

module.exports = router;
