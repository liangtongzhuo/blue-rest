'use strict';

const rest = require('./controller/rest.js');
const bodyParser = require('body-parser')
const router = require('express').Router();



// console.log(req.params);
// console.log(req.query);
// console.log(req.body);

//解析 body
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

//无id
router.route('/:tab')
    .get(function (req, res, next) {
        rest.get(req, res, next);
    })
    .post(function (req, res, next) {
        rest.post(req, res, next);
    });

//有id
router.route('/:tab/:objectid')
    .get(function (req, res, next) {
        rest.getId(req, res, next);
    })
    .put(function (req, res, next) {
        rest.putId(req, res, next);
    })
    .delete(function (req, res, next) {
        rest.putId(req, res, next);
    });

module.exports = router;