const Base = require('./base.js');

module.exports = class extends Base {
  constructor(ctx){
    super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
    // 其他额外的操作
  }
  indexAction() {
   this.body="hello world"
  }
};
