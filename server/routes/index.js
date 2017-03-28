"use strict";

const express = require('express');
const router = express.Router();
//集合操作
const collection = require('../models/index.js')
// console.log(req.params);
// console.log(req.query);
// console.log(req.body);


//无id
router.route('/:collection')
    .get(function(req, res) {
        //根据：collection 查询
        collection(req.params.collection).find(function(err, docs) {
            res.json(docs);
        });
    })
    .post(function(req, res) {
        //根据：req.body创建数据，并返回json对象
        const model = collection(req.params.collection);
        const doc = req.body
        const entity = new model(doc);
        entity.save(function(err, doc) {
            res.json(doc);
        });

    });

//有id
router.route('/:collection/:objectid')
    .get(function(req, res) {
        //根据：collection和id查询，返回对应json
        collection(req.params.collection).findById(req.params.objectid, function(err, doc) {
            res.json(doc);
        });
    })
    .put(function(req, res) {
        res.send('put');
    })
    .delete(function(req, res) {
        //根据：collection和id删除，返回json
        collection(req.params.collection).findByIdAndRemove(req.params.objectid, function(err, doc) {
            res.json(doc);
        });
    });

module.exports = router;
