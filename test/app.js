'use strict';

//初始化，连结数据库
require('./init/mongoose');
//加载配置
const config = require('./config.js');
const express = require('express');
const rest = require('../ltz-rest');



const app = express();

//rest Api
app.use('/', rest);

app.use(function (err, req, res, next) {
    //将异常堆栈输出，方便开发调试
    res.json({
        'error': err
    });
});


app.listen(config.port, function () {
    console.log('___server start');
});