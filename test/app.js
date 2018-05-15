'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

mongoose.connection
    .on('error', (error) => { console.log('mongoError', error) })
    .on('disconnected', () => console.log('mongo disconnected'))
    .once('open', () => console.log('mongo start'));


const express = require('express');
const app = express();

//1.引入框架
const rest = require('../index.js');
app.use('/', rest);

app.use(function (err, req, res, next) {
    //将异常堆栈输出，方便开发调试
    res.json({
        'error': err
    });
});

app.listen(3000, function () {
    console.log('server start');
});


//2.注册 mongoose 的模型
const Schema = mongoose.Schema;

const student = {
    name: String,
    age: Number,
    sex: String,
    xuexiao: {
        type: Schema.Types.ObjectId,
        ref: 'school'
    },
    score: {
        shuxue: Number,
        yuwen: Number
    }
};
mongoose.model('student', new Schema(student));

const school = {
    title: String
};
mongoose.model('school', new Schema(school));


rest.skip = {
    'student': 'ALL',//跳过 student 全部
    'school': 'GET'//跳过 school GET 方法
}
