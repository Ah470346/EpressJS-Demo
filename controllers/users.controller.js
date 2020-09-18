
const db = require('../db.js');
const shortid = require('shortid');

module.exports.index = function(req,res){
	res.render('users/index',{
		users: db.get('users').value()
	});
};

module.exports.search = function(req,res){
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
	});
	res.render('users/index', {
		users: matchedUsers,
		q: q
	})
};

module.exports.create = function(req,res){
	console.log(req.cookies);
	res.render('users/create');
};

module.exports.get = function(req,res){
	var id = req.params.id; // lấy về params :id
	var users = db.get('users').find({ id: id}).value();

	res.render('users/view',{
		user: users
	});
};

module.exports.postCreate = function(req,res){
	req.body.id = shortid.generate(); // lưu vào body một thuộc tính id 
	req.body.avatar = req.file.path.split("\\").slice(1).join("/");
	db.get('users').push(req.body).write();
	res.redirect('/user');
};
