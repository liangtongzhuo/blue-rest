'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//建立 schema，定义了数据模型，比如：字段名和类型。
const schema = new Schema({
    name: String,
    age: Number,
    sex: String,
    score: {
        shuxue: Number,
        yuwen: Number
    }
});
//先绑定：schema 然后转换成 model，有了操作数据库的能力。
const model = mongoose.model('Student', schema);

module.exports = model;
