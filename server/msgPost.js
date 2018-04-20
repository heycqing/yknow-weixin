/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */
const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIjXVlo33ueCm3'
const secretAccessKey = '4yxU4IFEpIlQgvLeFmKa2lR6jRoXFk'
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})
//发送短信
exports.sendMsg = function(sendPhone){
    smsClient.sendSMS({
        PhoneNumbers: sendPhone,
        SignName: '陌生人饭局',
        TemplateCode: 'SMS_129757636',
        TemplateParam: '{"code":"12345"}'
    }).then(function (res) {
        let {Code}=res
        if (Code === 'OK') {
            //处理返回参数
            console.log(res)
        }
    }, function (err) {
        console.log(err)
    })
}