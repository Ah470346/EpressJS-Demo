const express = require('express');
var cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const usersRoutes = require('./routes/users.route.js');
const authRoutes = require('./routes/auth.route.js');
const authMiddleware = require('./middleware/auth.middleware.js');


// pug
app.set('view engine', 'pug')
app.set('views', './views');

// config req.body 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser('jgewqjhgjhsadjs982w66'));

app.get('/', function(req,res){
	res.render('index',{
		name: 'AAA' //truyền tham số để trình duyệt nhận vào
	});
})

app.use('/user',authMiddleware.requireAuth,usersRoutes);
app.use('/auth',authRoutes)

app.listen(port , function(){
	console.log('server listening on port ' + port);
})