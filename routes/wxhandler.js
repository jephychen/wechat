/**
 * Created by chenshijue on 2016/10/17.
 */
var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next){
    console.log(req.body);
    var receiveData = '';
    req.on('data', function (chunk){
        receiveData += chunk;
    });
    req.on('end', function (){
        console.log('Accept data: ' + receiveData);
    });
    res.send("");
});

module.exports = router;