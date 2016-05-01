var express = require('express');
var app = express();
var port = 3000;

var middleware = {
	requireAuthentication: function (req, res, next){
		console.log('private route hit!');
		next();
	},
	logger: function(req, res, next){
		var date = new Date().toString();
		console.log('Request on ' + date + ': ' + req.method + ' ' + req.originalUrl);
		next();
	}
};

app.use(middleware.logger);//Global Authentication

app.get('/about', middleware.requireAuthentication, function (req, res){
	//Local authentication^
	res.send('About us');
});

app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
	console.log('Server Started at port ' + port);
});