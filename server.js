var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

// 데이터베이스와 연결합니다.
var connection = mysql.createConnection({
    host: "graduate.cbiz6ipldrs0.ap-northeast-2.rds.amazonaws.com",
    user: "soo",
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
        connection.query('SELECT * FROM userinfo', function (error, results) {
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
    connection.query('INSERT INTO userinfo (name) VALUES (?)', [body.name], function (err,res) {
      if(err)
        console.log(err)
        // 응답합니다.
        response.redirect('/');
    });
});

app.get('/select', function (request, response) {
    // 파일을 읽습니다.
    fs.readFile('select.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});

app.post('/select', function (req, res) {
    var body = req.body;
    connection.query('select * from subway where STATION_NM = ?', [body.name],function (err, result) {
        if (err)
            console.log(err)
        else {
            if (result.length === 0) {
                res.json({
                    data: false,
                    msg: '존재하지 않는 지하철입니다!'
                });
            } else {
                res.json({
                    data: true,
                    msg: '존재하는지하철입니다!',
                    지하철이름: body.name,
                    지하철이름영어로: result[0].STATION_NM_ENG,
                    지하철코드: result[0].STATION_CD
                });
            }
            //res.redirect('/');
        }
    })
});
