'use strict';

//全局配置
require('./server/config');
//初始化，连结数据库
require('./server/init/mongoose');


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var personSchema = Schema({
    _id: Number,
    name: String,
    age: Number,
    stories: [{
        type: Schema.Types.ObjectId,
        ref: 'Story'
    }]
});

var storySchema = Schema({
    _creator: {
        type: Number,
        ref: 'Person'
    },
    title: String,
    fans: [{
        type: Number,
        ref: 'Person'
    }]
});

var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);


// var aaron = new Person({
//     _id: 1,
//     name: 'Aaron',
//     age: 100
// });
//
// aaron.save(function(err, doc) {
//     if (err) return handleError(err);
//
//     var story1 = new Story({
//         title: "Once upon a timex.",
//         _creator: doc._id // assign the _id from the person
//     });
//
//     story1.save(function(err) {
//         if (err) return handleError(err);
//         // thats it!
//     });
// });


Story.findOne({
        title: 'Once upon a timex.'
    })
    .populate('_creator')
    .exec(function(err, story) {
        if (err) return handleError(err);
        console.log(story._creator, story._creator.name, story._creator.id);
    });
