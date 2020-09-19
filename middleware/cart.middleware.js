const db = require('../db');

module.exports.cart = function(req , res , next){
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;
	if(!sessionId){
		res.redirect('/products');
		return;
	}
	var counts = db.get('sessions')
		.find({id: sessionId})
		.get('cart')
		.value();
	var s = 0 ;
	for(var count in counts){
		s = s + counts[count];
	}
	res.locals.cart = s;
	next();
}