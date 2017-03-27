"use strict";

const express = require('express');
const router = express.Router();
//模型
const loadModel = require('../models/index.js')



// console.log(req.params);
// console.log(req.query);
// console.log(req.body);

//无id，多个文档
router.route('/:model')
    .get(function(req, res) {
        //查询一组
        loadModel(req.params.model).find(function(err, docs) {
            res.json(docs);
        });
    })
    .post(function(req, res) {
        //创建
        const model = loadModel(req.params.model);
        console.log(req.body);
        const doc = req.body //根据body提交上来的数据生成数据
        const entity = new model(doc);

        // 保存回调
        entity.save(function(err, doc) {
            res.json(doc);
        });

    })
    .put(function(req, res) {
        res.send('put');
    })
    .delete(function(req, res) {
        res.send('delete');
    });

//有id
router.route('/:model/:objectid')
    .get(function(req, res) {
        //查询一个
        loadModel(req.params.model).findById(req.params.objectid, function(err, doc) {
            res.json(doc);
        });
    })
    .post(function(req, res) {
        res.send('post');
    })
    .put(function(req, res) {
        res.send('put');
    })
    .delete(function(req, res) {
        res.send('delete');
    });


module.exports = router;





// {
//     name: "xxxx",
//     age: 6,
//     sex: 'man',
//     score: {
//         shuxue: 100,
//         yuwen: 100
//     }
// }
