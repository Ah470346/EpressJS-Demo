
const express = require('express');
const controller = require('../controllers/users.controller.js');
const validate = require('../validate/users.validate.js');
const authMiddleware = require('../middleware/auth.middleware.js');


const router = express.Router();

router.get('/',controller.index);

router.get('/cookie',function(req , res , next){
	res.cookie('user-id',12345);
	res.send('hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate,controller.postCreate);	


module.exports = router;