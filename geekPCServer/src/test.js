/**
 * @Description:
 * @author GeekQiaQia
 * @date 2019/11/12 14:53
 * @IDE WebStorm
 */

const esprima = require("esprima");
const estraverse = require("estraverse");
const escodegen= require("escodegen");

let code = "var answer=6 * 7";

let tree=esprima.parseScript(code); // 生成语法树
// 遍历语法树
estraverse.traverse(tree, {
    enter(node) {
        console.log("enter", node.type);
        // 修改变量名
        if(node.type==='VariableDeclarator'){
                node.id.name='result';
        }
    },
    leave(node) {
        console.log("leave", node.type);
    }
});

// 编译修改后的语法树；
let compileTreeJS=escodegen.generate(tree);
console.log(compileTreeJS);
