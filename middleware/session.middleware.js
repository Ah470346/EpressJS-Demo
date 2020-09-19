
const shortid = require('shortid');
const db = require('../db.js');

module.exports.session = function(req , res , next) {
	if(!req.signedCookies.sessionId){
		var sessionId = shortid.generate()
		res.cookie('sessionId', sessionId, {
			signed: true
		});

		db.get('sessions').push({
			id: sessionId,
			cart: {}
		}).write();
	}
	next();
}