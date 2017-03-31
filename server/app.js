'use strict';

//全局配置
const config = require('./config.js');
//初始化，连结数据库
require('./init/mongoose');

const express = require('express');
const bodyParser = require('body-parser')
const router = require('./routes/index.js');

const app = express();

//解析 body
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//rest Api
app.use('/', router);

app.use(function(err, req, res, next) {
    //将异常堆栈输出，方便开发调试
    res.json({
        'error': err
    });
});

app.listen(config.port, function() {
    console.log('___server start');
});
