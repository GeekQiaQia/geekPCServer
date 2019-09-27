const BaseRest = require('../rest.js');
const svgCaptcha=require('svg-captcha');

module.exports = class extends BaseRest {
    // async __before(){
    //     const userInfo = await this.session('userInfo');
    //     //获取用户的 session 信息，如果为空，返回 false 阻止后续的行为继续执行
    //     if(think.isEmpty(userInfo)){
    //         return false;
    //     }
    // }
    async loginAction() {
        let {username, password,type} = this.post();
        const salt = 'geekQiaQia';
        password = think.md5(salt + password);
        const login_ip = this.ctx.ip;
        let dateTime = new Date();
        let login_time = think.datetime(dateTime);
        // await this.model("log").add({
        //     flag:1,usernum,login_time,password:password,login_ip
        // });
        try{
            let user=await this.model("user").where({email: username}).find();

            if(user.password&&user.password===password){
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
        let {password, email, mobile} = this.post();

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
                id,password,  mobile, email, create_time
            });
            let resJsonObj={
                status:"true",
                code:"0000",
                desc:"操作成功"
            };
            return this.success(resJsonObj);

        } catch(e) {
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
