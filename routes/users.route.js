
const express = require('express');
const controller = require('../controllers/users.controller.js');


const router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', controller.postCreate);	


module.exports = router;