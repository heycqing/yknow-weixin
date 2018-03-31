var request = require('request');
var md5 = request('md5');

// 时间戳
var timestamp = new Date().getTime();
timestamp = formatDate(timestamp);
var sig = '48bb2366de4a4e79ae7133936ab731b1'+'AUTH TOKEN'+timestamp;
var str = md5(sig)


function formatDate(now) {
    　　var year = now.getFullYear(),
    　　month = now.getMonth() + 1,
    　　date = now.getDate(),
    　　hour = now.getHours(),
    　　minute = now.getMinutes(),
    　　second = now.getSeconds();
    　　return year + month + date + hour + minute + second;
}

request({url:'https://api.miaodiyun.com/20150822/query/accountInfo?accountSid=a14f6bfd43ce44c9b019de57f4e2de4b&timestamp=20150821100312&sig=a14f6bfd43ue44c9b019du57f4e2ee4r&',form:{
    accountSid:'48bb2366de4a4e79ae7133936ab731b1',
    timestamp:timestamp,
    sig:sig,
    respDataType:'JSON',

}}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // 获取body;
  }
})