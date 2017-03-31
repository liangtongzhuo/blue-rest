'use strict';

let arrarObject = {};

//<--样板-->
arrarObject["student"] = {
    name: String,
    age: Number,
    sex: String,
    score: {
        shuxue: Number,
        yuwen: Number
    }
};
//<--/样板-->
module.exports = arrarObject;
