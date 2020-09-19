const db = require('../db');
const shortid = require('shortid');

module.exports.transfer = function(req,res,next){
	res.render('transfer/index',{
		csrfToken: req.csrfToken()
	});
}

module.exports.postTransfer = function(req,res,next){
	var data = {
		id: shortid.generate(),
		amount: parseInt(req.body.amount),
		accountId: req.body.accountId,
		userID: req.signedCookies.userID
	}
	db.get('transfers').push(data).write();
	res.redirect('/transfer');
}