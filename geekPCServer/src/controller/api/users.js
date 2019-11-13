
const BaseRest = require('../rest.js');
const svgCaptcha=require('svg-captcha');

module.exports = class extends BaseRest {
    async __before(){
        this.header("Access-Control-Allow-Origin",this.header("origin")||"*");
        this.header("Access-Control-Allow-Headers", "x-requested-with,content-type");
        this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
        this.header('Access-Control-Allow-Credentials',true);
        let method=this.method.toLowerCase();
        //  处理预检请求，给body设置一个值，否则报错404；
        if(method==="options"){
            this.ctx.body=200;
            return false;
        }
    }
    async loginAction() {
        let {email, password,type} = this.post();
        const salt = 'geekQiaQia';
        password = think.md5(salt + password);
        const login_ip = this.ctx.ip;
        let dateTime = new Date();
        let login_time = think.datetime(dateTime);

        try{
            let user=await this.model("user").where({email: email}).find();

            if(user.password&&user.password===password){
                // await this.model("log").add({
                //     flag:1,email,login_time,password:password,login_ip
                // });
               let logStatus= await this.model("log").where({email}).find();
               console.log("email is exist=",logStatus.email);
               if(logStatus.email){
                   // 如果登录成功，则update登录日志；
                   await this.model("log").where({email}).update({
                       flag:1,login_time,password:password,login_ip
                   });
               }else{
                   // 如果首次登录，则添加首次登录记录；
                   await this.model("log").add({
                       flag:1,email,login_time,password:password,login_ip
                   });
               }
                let resJsonObj={
                    status:"true",
                    code:"0000",
                    desc:"操作成功",
                    type,
                    currentAuthority:"user",
                };
              return this.success(resJsonObj);
            }else{
                return this.fail("用户名或者密码错误");
            }
        }catch (e) {
            think.logger.error(new Error(e));
            let resJsonObj={
                status:"false",
                code:"0110",
                desc:"系统内部错误"
            };
            return this.fail(resJsonObj, e);
        }

    }
    async registerAction() {
        // let company_id = this.user.company_id || this.post('username');
        // let company_name  = this.user.company_name || this.post('password');
        // let department_id = this.user.department_id || this.post('email');
        // let department_name = this.user.department_name || this.post('phone');
        let {password,email,mobile} = this.post();
           console.log('this.post is =',password,email,mobile);
        try {
            let userExist = await this.model('user').where({
                email
            }).select();
            if(!think.isEmpty(userExist)) {

                return this.fail("用户已经存在");
            }
            const salt = 'geekQiaQia';
             password = think.md5(salt + password);
            let dateTime = new Date();
            let id=think.uuid("v4");
            let create_time = dateTime.getFullYear() + '-' +  Number(dateTime.getMonth() + 1 )  + '-' + dateTime.getDate() + ' '+ dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
            await this.model('user').add({
                id,password,  mobile:mobile, email, create_time
            });
            let resJsonObj={
                status:"true",
                code:"0000",
                desc:"注册成功"
            };
            return this.success(resJsonObj);

        } catch(e) {
            think.logger.error(new Error(e));
            let resJsonObj={
                status:"false",
                code:"0110",
                desc:"系统内部错误"
            };
            return this.fail(resJsonObj, e);
        }
    }
    async getCaptchaAction(){
            let codeConfig={ fontSize: 50, width: 100, height: 40,size: 4 ,background: '#cc9966',color: true}
            let captcha=svgCaptcha.create(codeConfig);
            let resData={
                text:captcha.text,
                data:captcha.data
            }
        return this.success(resData);

    }
};
