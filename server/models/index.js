'use strict';



//根据collection加载 model
function loadModel(collection) {
    return require('./' + collection + '.js');
};

module.exports = loadModel;



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
