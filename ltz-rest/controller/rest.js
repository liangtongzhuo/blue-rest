'use strict'
const mongoose = require('mongoose');

//根据 tab名字 ,返回模型
const tab = function(tab) {
    const model = mongoose.model(tab);
    return model;
};


//创建 - 根据：查询条件，并返回json对象
const get = function(req, res, next) {
    let where = req.query._where;
    const sort = req.query._sort || {};
    const skip = parseInt(req.query._skip, 10) || 0;
    const limit = parseInt(req.query._limit, 10) || 100;
    const populte = req.query._populte || '';
    if (where) {
        where = JSON.parse(where);
        for (var key in where) {
            if (where[key]._regex) {
                where[key] = new RegExp(where[key]._regex);
            }
            if (where[key]._lt) {
                where[key].$lt = where[key]._lt;
                delete where[key]._lt;
            }
            if (where[key]._lte) {
                where[key].$lte = where[key]._lte;
                delete where[key]._lte;
            }
            if (where[key]._gt) {
                where[key].$gt = where[key]._gt;
                delete where[key]._gt;
            }
            if (where[key]._gte) {
                where[key].$gte = where[key]._gte;
                delete where[key]._gte;
            }
            if (where[key]._ne) {
                where[key].$ne = where[key]._ne;
                delete where[key]._ne;
            }

        }
    }
    //查询 - 根据：tab
    tab(req.params.tab).find(where)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate(populte)
        .exec(function(err, docs) {
            if (err) {
                next(err);
                return;
            };
            res.json(docs);
        });
}

//创建 - 根据：req.body创建数据，并返回json对象
const post = function(req, res, next) {
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
}

//有id

//id查询 - 根据：tab和id，返回对应json
const getId = function(req, res, next) {
    const populte = req.query._populte || '';
    tab(req.params.tab)
        .findById(req.params.objectid)
        .populate(populte)
        .exec(function(err, doc) {
            if (err) {
                next(err);
                return;
            };
            res.json(doc);
        });
}

//id修改 - 根据：tab、id和属性，修改对象，并且返回json
const putId = function(req, res, next) {
    const populte = req.query._populte || '';
    tab(req.params.tab)
        .findByIdAndUpdate(req.params.objectid, {
            $set: req.body
        }, {
            new: true
        })
        .populate(populte)
        .exec(function(err, doc) {
            if (err) {
                next(err);
                return;
            };
            res.json(doc);
        });
}

//id删除 - 根据：tab和id删除，返回json
const deleteId = function(req, res, next) {
    tab(req.params.tab).findByIdAndRemove(req.params.objectid)
        .exec(function(err, doc) {
            if (err) {
                next(err);
                return;
            };
            res.json(doc);
        });
}

module.exports.get = get;
module.exports.post = post
module.exports.getId = getId
module.exports.putId = putId
module.exports.deleteId = deleteId
