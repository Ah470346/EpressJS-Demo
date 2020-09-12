const express = require('express');
const app = express();
const port = 3000;

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json');
// lowdb
const db = low(adapter);

// short id
const shortid = require('shortid');

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
  .write()

// pug
app.set('view engine', 'pug')
app.set('views', './views');

// config req.body 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', function(req,res){
	res.render('index',{
		name: 'AAA' //truyền tham số để trình duyệt nhận vào
	});
})

app.get('/user', function(red,res){
	res.render('users/index',{
		users: db.get('users').value()
	});
})

app.get('/user/search',function(req,res){
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
	});
	res.render('users/index', {
		users: matchedUsers,
		q: q
	})
})

app.get('/user/create',function(req,res){
	res.render('users/create');
})

app.get('/user/:id',function(req,res){
	var id = req.params.id; // lấy về params :id
	var users = db.get('users').find({ id: id}).value();

	res.render('users/view',{
		user: users
	});
})

app.post('/user/create',function(req,res){
	req.body.id = shortid.generate(); // lưu vào body một thuộc tính id 
	db.get('users').push(req.body).write()
	res.redirect('/user');
})

app.listen(port , function(){
	console.log('server listening on port ' + port);
})