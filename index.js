const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req,res){
	res.send('<h1>hello my world !</h1>');
})

app.get('/user', function(red,res){
	res.send('User list');
})

app.listen(port , function(){
	console.log('server listening on port ' + port);
})