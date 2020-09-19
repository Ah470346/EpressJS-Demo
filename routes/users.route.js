
const express = require('express');
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })
const controller = require('../controllers/users.controller.js');
const validate = require('../validate/users.validate.js');

const router = express.Router();

router.get('/',controller.index);

router.get('/cookie',function(req , res , next){
	res.cookie('user-id',12345);
	res.send('hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', 
	upload.single('avatar'), 
	validate.postCreate,
	controller.postCreate
);	


module.exports = router;