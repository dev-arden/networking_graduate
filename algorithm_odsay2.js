var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var express = require('express');
var java = require('java');
//var mysql = require('mysql');



// var connection = mysql.createConnection({
//     host: "graduate.cbiz6ipldrs0.ap-northeast-2.rds.amazonaws.com",
//     user: "soo",
//     database: "graduate",
//     password: "11111111",
//     port: 3306
// });
// connection.connect();

var app = module.exports = express();

// set CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json({limit: '50mb'}));

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public'));

// import Hello class
java.classpath.push("./algorithm_odsay2.jar/");
var Hello = java.import("algorithm_odsay2.main");

app.get('/main', function(req, res) {
    res.send(Hello.mainSync(String));
});

app.get('/show', function(req, res) {
    res.send(Hello.showSync());
});

// app.get('/cal', function(req, res) {
//     var a = req.query.a;
//     var b = req.query.b;
//     console.log(a, b);
//     res.send(String(Hello.addNumbersSync(Number(a), Number(b))));
// });
//
// app.get('/addjs', function(req, res) {
//     var a = req.query.a;
//     var b = req.query.b;
//     console.log(a, b);
//     res.send(String(Hello.addNumbersJSSync(Number(a), Number(b))));
// });
//
// app.get('/subtractjs', function(req, res) {
//     var a = req.query.a;
//     var b = req.query.b;
//     console.log(a, b);
//     res.send(String(Hello.subtractNumbersJSSync(Number(a), Number(b))));
// });

// START THE SERVER
// =============================================================================
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
