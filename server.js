var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

// 데이터베이스와 연결합니다.
var connection = mysql.createConnection({
    host: "graduate.c8orux21tjlg.ap-northeast-2.rds.amazonaws.com",
    user: "rain",
    database: "graduate",
    password: "11111111",
    port: 3306
});
connection.connect();

// 서버를 생성합니다.
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

// 서버를 실행합니다.
app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

// 라우트를 수행합니다.
app.get('/', function (request, response) {
    // 파일을 읽습니다.
    fs.readFile('list.html', 'utf8', function (error, data) {
        // 데이터베이스 쿼리를 실행합니다.
        connection.query('SELECT * FROM android', function (error, results) {
            // 응답합니다.
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
});

app.get('/insert', function (request, response) {
    // 파일을 읽습니다.
    fs.readFile('insert.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});

app.post('/insert', function (request, response) {
    // 변수를 선언합니다.
    var body = request.body;
    // 데이터베이스 쿼리를 실행합니다.
    connection.query('INSERT INTO android (name, country) VALUES (?, ?)', [
        body.name, body.country
    ], function () {
        // 응답합니다.
        response.redirect('/');
    });
});
