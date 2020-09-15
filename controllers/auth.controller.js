
const md5 = require('md5');
const db = require('../db.js');

module.exports.login = function(req,res){
	res.render('auth/login',{
		users: db.get('users').value()
	});
};

module.exports.postLogin = function(req,res){
	var email =  req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({email: email}).value();

	if(!user) {
		res.render('auth/login',{
			errors: [
			'User dose not exist!'
			] ,
			values: req.body
		});
		return
	}

	var hashedPassword = md5(password);

	if(user.password !== hashedPassword){
		res.render('auth/login',{
			errors: [
			'Wrong password!'
			] ,
			values: req.body
		});
		return
	}
	res.cookie('userID', user.id, {
		signed: true
	});
	res.redirect('/user');
};
