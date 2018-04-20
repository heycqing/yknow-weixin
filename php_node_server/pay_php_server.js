var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql')
 
var app = express();
 
    // bodyParser.urlencoded解析form表单提交的数据
    app.use(bodyParser.urlencoded({extended: false}));
    
    // bodyParser.json解析json数据格式的
    app.use(bodyParser.json());
    
    app.post('/saveJSON',function(req, res){
 
        // 对象转换为字符串
        var str_openId = JSON.stringify(req.body.openId); 
        var str_out_trade_no = JSON.stringify(req.body.out_trade_no)
        // var a=  JSON.parse(JSON.stringify(req.body,2))
        
        console.log('str_openId:'+str_openId);
        console.log('str_out_trade_no:'+str_out_trade_no)
        var connection = mysql.createConnection({     
            host     : '39.108.58.83',       
            user     : 'root',              
            password : '1234',       
            port: '3306',                   
            database: 'YK', 
        }); 

        connection.connect();
        var modSql = 'UPDATE dataOfYK SET out_trade_no='+str_out_trade_no +' WHERE openId = '+str_openId;
        // var modSqlParams = [str_json];
        // console.log(modSqlParams)
        console.log('\n'+modSql+'\n')
        //改
        connection.query(modSql,function (err, result) {
        if(err){
                console.log('[UPDATE ERROR] - ',err.message);
                return;
        }        
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows',result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
        });

        connection.end();
    
        fs.writeFile('check.json',str_openId, 'utf8', function(){
        // 保存完成后的回调函数
    
        console.log("保存完成");
        });
 
    });
 
app.listen(2707);
