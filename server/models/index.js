'use strict';

const mongoose = require('mongoose');
require('./models.js');

//根据 tab ,返回模型
function tab(tab) {
    const model = mongoose.model(tab);
    return model;
};

module.exports = tab;


