'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//根据设计数据库对象加载进来。
const arrarObject = require('./models.js');

for (var key in arrarObject) {
    if (arrarObject.hasOwnProperty(key)) {
        //根据对象，且建立 schema，定义了数据模型，比如：字段名和类型。
        const schema = new Schema(arrarObject[key]);
        //绑定：schema ，注册为model,有了操作数据库的能力。
        mongoose.model(key, schema);
    }
}


//根据 tab ,返回模型
function tab(tab) {
    const model = mongoose.model(tab);
    return model;
};

module.exports = tab;

// model.find({}, null, {
//     skip: 3,
//     limit: 3,
//     sort: {
//         age: -1
//     }
// }, function(err, docs) {
//     //查询所有数据，并按照age降序顺序返回数据docs
//     docs.forEach(function(doc) {
//         console.log(doc.name, doc.age);
//     });
// });
