'use strict';

const config = require('../config.js');
const mongoose = require('mongoose');
const db = mongoose.connect(config.mongodb);
db.Promise = global.Promise;

db.connection.on('error', function (error) {
    console.log('___db：error');
    console.log(error);
});

db.connection.on('open', function () {
    console.log('___db:open');
});