'use strict';

require('./models.js');
const mongoose = require('mongoose');


//根据 tab名字 ,返回模型
const tab = function(tab) {
    const model = mongoose.model(tab);
    return model;
};

module.exports = tab;
