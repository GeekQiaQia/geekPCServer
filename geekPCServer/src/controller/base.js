module.exports = class extends think.Controller {
  __before() {
    //indexAction 执行完成后执行，如果 indexAction 返回了 false 则不再执行
  }
  __call(){
    //如果相应的Action不存在则调用该方法
  }
};
