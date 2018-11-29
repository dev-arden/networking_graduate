
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "graduate.c8orux21tjlg.ap-northeast-2.rds.amazonaws.com",
    user: "rain",
    database: "graduate",
    password: "11111111",
    port: 3306
});
connection.connect();

module.exports = function(app, fs)
{
  app.get('/',function(req,res){
    connection.query("SELECT * FROM test", function (err, result, fields) {
        if(err) throw err;
        res.send(result);
       })
   });
   app.get('/test',function(req,res){
     connection.query("SELECT * FROM testtest", function (err, result, fields) {
         if(err) throw err;
         res.send(result);
        })
   });
 }
    //  app.get('/',function(req,res){
    //     res.render('index.html')
    //  });
    //  app.get('/about',function(req,res){
    //     res.render('about.html');
    // });
    // app.get('/',function(req,res){
    //      res.render('index', {
    //          title: "MY HOMEPAGE",
    //          length: 5
    //      })
    //  });

    // app.get('/list', function (req, res) {
    //    fs.readFile( __dirname + "/../data/" + "user.json", 'utf8', function (err, data) {
    //        console.log( data );
    //        res.end( data );
    //    });
    // })

   //  app.get('/getUser/:username', function(req, res){
   //    fs.readFile( __dirname + "/../data/user.json", 'utf8', function (err, data) {
   //         var users = JSON.parse(data);
   //         res.json(users[req.params.username]);
   //    });
   // });

   // app.post('/addUser/:username', function(req, res){
   //
   //         var result = {  };
   //         var username = req.params.username;
   //
   //         // CHECK REQ VALIDITY
   //         if(req.body["password"] || req.body["name"]){
   //             result["success"] = 0;
   //             result["error"] = "invalid request";
   //             res.json(result);
   //             return;
   //         }
   //
   //         // LOAD DATA & CHECK DUPLICATION
   //         fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
   //             var users = JSON.parse(data);
   //             if(users[username]){
   //                 // DUPLICATION FOUND
   //                 result["success"] = 0;
   //                 result["error"] = "duplicate";
   //                 res.json(result);
   //                 return;
   //             }
   //
   //             // ADD TO DATA
   //             users[username] = req.body;
   //
   //             // SAVE DATA
   //             fs.writeFile(__dirname + "/../data/user.json",
   //                          JSON.stringify(users, null, '\t'), "utf8", function(err, data){
   //                 result = {"success": 1};
   //                 res.json(result);
   //             })
   //         })
   //     });

    //    app.delete('/deleteUser/:username', function(req, res){
    //     var result = { };
    //     //LOAD DATA
    //     fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data){
    //         var users = JSON.parse(data);
    //
    //         // IF NOT FOUND
    //         if(!users[req.params.username]){
    //             result["success"] = 0;
    //             result["error"] = "not found";
    //             res.json(result);
    //             return;
    //         }
    //
    //         delete users[req.params.username];
    //         fs.writeFile(__dirname + "/../data/user.json",
    //                      JSON.stringify(users, null, '\t'), "utf8", function(err, data){
    //             result["success"] = 1;
    //             res.json(result);
    //             return;
    //         })
    //     })
    //
    // })
