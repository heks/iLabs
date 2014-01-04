var express = require('express');
var http = require('http');
var app = express();


app.configure(function() {
	app.use(express.logger());                                  // Log requests to the console
	app.use(express.bodyParser());                              // Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method
	app.use(express.cookieParser());
	// app.use(express.cookieSession());                           // Store the session in the (secret) cookie
 	app.use(express.methodOverride());
 	app.use(express.static(__dirname + '/client/build'));


});

var port = 9000;
app.listen(port, function() {
  console.log("Listening on " + port);
});