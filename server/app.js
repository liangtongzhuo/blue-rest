'use strict';

//全局配置
require('./config');
//初始化，连结数据库
require('./init/mongoose');

const express = require('express');
const router = require('./routes/index.js');

const app = express();


//rest Api
app.use('/', router);


// app.use(function(err, req, res, next) {
//     //将异常堆栈输出到页面，方便开发调试
//     res.render('error', {
//         message: err.message,
//         error: err
//     });
// });


app.listen(8080, function() {
    console.log('___server start');
});
