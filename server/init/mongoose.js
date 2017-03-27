const mongoose = require('mongoose');
const db = mongoose.connect(global._config.mongodb);

db.connection.on('error', function() {
    console.log('___db：error');
});

db.connection.on('open', function() {
    console.log('___db:open');
});
