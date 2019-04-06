var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var java = require('java');
//var java2 = require('java');

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


// import Hello class
java.classpath.push("./algorithm_odsay2.jar/");
var Hello = java.import("algorithm_odsay2.main");



app.get('/result', function(req, res) {
  // 파일을 읽습니다.
  fs.readFile('result.html', 'utf8', function (error, data) {
      // 응답합니다.
      response.send(data);
  });
});


//왜 아톰이 안보내지냐고
app.post('/result', function(req, res) {
    res.send(Hello.mainSync(String));
});




// app.post('/main', function(req, res) {
//     res
// });

app.get('/show', function(req, res) {
    res.send(Hello.showSync());
});

// 서버를 실행합니다.
// app.listen(3000, function(){
//     console.log("Express server has started on port 3000")
// });

// 라우트를 수행합니다.
app.get('/', function (request, response) {
    // 파일을 읽습니다.


    // connection.query('SELECT * from Person', function(err, rows, fields) {
    // connection.end();
    //   if (!err){
    //     response.send(rows);
    //     console.log('The solution is: ', rows);
    //   }
    //   else
    //     console.log('Error while performing Query.');
    //   });
    // });


    fs.readFile('list.html', 'utf8', function (error, data) {
        // 데이터베이스 쿼리를 실행합니다.
        connection.query('SELECT id, name FROM userinfo ', function (error, rows,results) {
            // 응답합니다.
            if (!error){
              response.send(rows);
              //console.log('The solution is: ', rows);
            }
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
    connection.query('INSERT INTO userinfo (name, userRoute) VALUES (?,?)', [body.name, body.userRoute], function (err,res) {
      if(err)
        console.log(err)
        // 응답합니다.
      // else{
      //
      // }
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
                  //data: false,
                  //msg:
                  msg:'존재하지 않는 지하철입니다!'
              });
            } else {
                res.json({
                    //data: true,
                    //msg:
                    msg:'존재하는지하철입니다!'
                    //지하철이름: body.name,
                    //지하철이름영어로: result[0].STATION_NM_ENG,
                    //지하철코드: result[0].STATION_CD
                });
            }
            //res.redirect('/');
        }
    })
});

app.get('/userresult', function (request, response) {
    // 파일을 읽습니다.
    fs.readFile('insert.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});

app.post('/userresult', function (request, response) {
    // 변수를 선언합니다.
    //var body = request.body;
    // 데이터베이스 쿼리를 실행합니다.
    connection.query('select user, rank, name from rankSave ',  function (err,rows) {
      if(err)
        console.log(err)
        // 응답합니다.
      else{
        //return response.json(rows);
        response.json(rows);//이게 제이슨으로 보낸다는거
      }

    });
});

app.get('/showroute', function (request, response) {
    // 파일을 읽습니다.
    fs.readFile('showroute.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});
app.post('/showroute', function (request, response) {
    // 변수를 선언합니다.
    //var body = request.body;
    // 데이터베이스 쿼리를 실행합니다.
    connection.query('select user, name from makeroute ',  function (err,rows) {
      if(err)
        console.log(err)
        // 응답합니다.
      else{
        response.send(rows);
      }

    });
});
app.get('/join', function (request, response) {
    // 파일을 읽습니다.
    fs.readFile('join.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});
app.post('/join',function(request,response){
         var userId = req.body.userId;
         var userPwd = req.body.userPwd;

         var sql = 'INSERT INTO userDB (userId, userPwd) VALUES (?,?)';
         var params = [userId, userPwd];

         connection.query(sql,params,function(err,result){
                          if(err)
                          console.log(err);
                          else{
                          res.json({
                                   result:true,
                                   msg: '회원가입에 성공했습니다.'

                          })
                          }
                          });

         });
         app.get('/login', function (request, response) {
             // 파일을 읽습니다.
             fs.readFile('login.html', 'utf8', function (error, data) {
                 // 응답합니다.
                 response.send(data);
             });
         });
app.post('/login',function(request, response){
         var userId = req.body.userId;
         var userPwd = req.body.userPwd;
         var sql = 'select * from userDB where userId = ?'

         connection.query(sql,userId,function(err,result){
                          if(err)
                          console.log(err)
                          else{
                          if(result.length===0){
                          res.json({
                                   result:false,
                                   msg: '존재하지 않는 계정입니다!'
                                   });
                          } else if(pwd !==result[0].userPwd){
                          res.json({
                                   result:false,
                                   msg:'비밀번호가 틀렸습니다!'
                                   });
                          }else{
                          res.json({
                                   result:true,
                                   msg:'로그인성공!',
                                   user_Id:userId
                                   });
                          }
                          }
                          })
         });



http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
