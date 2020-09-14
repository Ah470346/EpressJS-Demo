const express = require('express');
var cookieParser = require('cookie-parser')
const app = express();
const port = 3000;

const usersRoutes = require('./routes/users.route.js');



// pug
app.set('view engine', 'pug')
app.set('views', './views');

// config req.body 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser())

app.get('/', function(req,res){
	res.render('index',{
		name: 'AAA' //truyền tham số để trình duyệt nhận vào
	});
})

app.use('/user',usersRoutes);

app.listen(port , function(){
	console.log('server listening on port ' + port);
})