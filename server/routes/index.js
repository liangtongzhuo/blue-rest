'use strict';

const rest = require('../controller/rest.js');
const express = require('express');
const router = express.Router();


// console.log(req.params);
// console.log(req.query);
// console.log(req.body);
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