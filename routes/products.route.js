
const express = require('express');
const controller = require('../controllers/products.controller.js');

const router = express.Router();

router.get('/',controller.index);

module.exports = router;