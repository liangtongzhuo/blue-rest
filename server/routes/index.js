'use strict';

const express = require('express');
const router = express.Router();
//集合操作
const tab = require('../models/index.js')
// console.log(req.params);
// console.log(req.query);
// console.log(req.body);
//无id
router.route('/:tab')
    .get(function(req, res, next) {
        const sort = req.query._sort;
        const skip = parseInt(req.query._skip, 10) || 0;
        const limit = parseInt(req.query._limit, 10) || 100;
        delete req.query._sort;
        delete req.query._skip;
        delete req.query._limit;
        //查询 - 根据：tab
        tab(req.params.tab).find(req.query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec(function(err, docs) {
                if (err) {
                    next(err);
                    return;
                };
                res.json(docs);
            });

    })
    .post(function(req, res, next) {
        //创建 - 根据：req.body创建数据，并返回json对象
        const Model = tab(req.params.tab);
        const doc = req.body
        const entity = new Model(doc);
        entity.save(function(err, doc) {
            if (err) {
                next(err);
                return;
            };
            res.json(doc);
        });
    });

//有id
router.route('/:tab/:objectid')
    .get(function(req, res, next) {
        //id查询 - 根据：tab和id，返回对应json
        tab(req.params.tab).findById(req.params.objectid, function(err, doc) {
            if (err) {
                next(err);
                return;
            };
            res.json(doc);
        });
    })
    .put(function(req, res, next) {
        //id修改 - 根据：tab、id和属性，修改对象，返回json
        tab(req.params.tab).findByIdAndUpdate(req.params.objectid, {
            $set: req.body
        }, {}, function(err, doc) {
            if (err) {
                next(err);
                return;
            };
            res.json(doc);
        });
    })
    .delete(function(req, res, next) {
        //id删除 - 根据：tab和id删除，返回json
        tab(req.params.tab).findByIdAndRemove(req.params.objectid, function(err, doc) {
            if (err) {
                next(err);
                return;
            };
            res.json(doc);
        });
    });

module.exports = router;
router;
