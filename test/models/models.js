'use strict';

const mongoose = require('mongoose');
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