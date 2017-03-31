const config = require('../config.js');
const mongoose = require('mongoose');
const db = mongoose.connect(config.mongodb);

db.connection.on('error', function() {
    console.log('___db：error');
});

db.connection.on('open', function() {
    console.log('___db:open');
});
