var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql')
 
var app = express();
 
    // bodyParser.urlencoded解析form表单提交的数据
    app.use(bodyParser.urlencoded({extended: false}));
    
    // bodyParser.json解析json数据格式的
    app.use(bodyParser.json());
    // 设置头文件
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    app.post('/saveData',function(req, res){
 
    // 对象转换为字符串
    var str_json = JSON.stringify(req.body)
    var str_name = req.body.name; 
    var str_sex = req.body.sex; 
    var str_age = req.body.age;
    var str_phone = req.body.phone;
    
    // console.log('str:'+str_json)
    var connection = mysql.createConnection({     
        host     : '39.108.58.83',       
        user     : 'root',              
        password : '1234',       
        port: '3306',                   
        database: 'YK', 
    }); 

    connection.connect();
    var modSql = 'insert  INTO  dataOfYK (id,sex,name,age,phone) value(0,?,?,?,?)';
    var modSqlParams = [str_sex,str_name,str_age,str_phone]
  
    //改
    connection.query(modSql,modSqlParams,function (err, result) {
    if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
    }        
    console.log('--------------------------insert----------------------------');
    console.log('UPDATE affectedRows',result);
    console.log('-----------------------------------------------------------------\n\n');
    });

    connection.end();
 
    fs.writeFile('YKdata.json',str_json, 'utf8', function(){
    // 保存完成后的回调函数
    console.log("保存完成");
    });
 
});
 
app.listen(3333);