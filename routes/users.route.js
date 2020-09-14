const express = require('express');
const shortid = require('shortid');

const db = require('../db.js');
const router = express.Router();

router.get('/', function(red,res){
	res.render('users/index',{
		users: db.get('users').value()
	});
})

router.get('/search',function(req,res){
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
	});
	res.render('users/index', {
		users: matchedUsers,
		q: q
	})
})

router.get('/create',function(req,res){
	res.render('users/create');
})

router.get('/:id',function(req,res){
	var id = req.params.id; // lấy về params :id
	var users = db.get('users').find({ id: id}).value();

	res.render('users/view',{
		user: users
	});
})

router.post('/create',function(req,res){
	req.body.id = shortid.generate(); // lưu vào body một thuộc tính id 
	db.get('users').push(req.body).write()
	res.redirect('/user');
})


module.exports = router;