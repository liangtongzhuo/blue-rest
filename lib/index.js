'use strict';

const rest = require('./controller/rest.js');
const bodyParser = require('body-parser')
const router = require('express').Router();

//解析 body
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

//无id
router.route('/:tab')
    .get(function (req, res, next) {
        if (skipMid(req, res, next, 'GET')){
            return;
        }
        rest.get(req, res, next);
    })
    .post(function (req, res, next) {
        if (skipMid(req, res, next, 'POST')){
            return;
        }
        rest.post(req, res, next);
    });

//有id
router.route('/:tab/:objectid')
    .get(function (req, res, next) {
        if (skipMid(req, res, next, 'GETID')){
            return;
        }
        rest.getId(req, res, next);
    })
    .put(function (req, res, next) {
        if (skipMid(req, res, next, 'PUT')){
            return;
        }
        rest.putId(req, res, next);
    })
    .delete(function (req, res, next) {
        if (skipMid(req, res, next, 'DELETE')){
            return;
        }
        rest.deleteId(req, res, next);
    });

//是否跳过中间件
function skipMid(req, res, next, str){
    //是否设置跳过
    if (!router.skip || !router.skip[req.params.tab]) {
        return false;
    }
    //是否全部跳过
    if (router.skip[req.params.tab] == 'ALL') {
        next();
        return true;
    }
    //是否跳过一个
    if (router.skip[req.params.tab].split(',').indexOf(str) >= 0) {
        next();
        return true;
    }
    return false;
}

module.exports = router;