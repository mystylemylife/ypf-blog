const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const generator = require("@babel/generator");
const types = require("@babel/types");

const fs = require("fs");

const code = `const a=1;  `;
// 1.parser将代码解析为抽象语法树（AST）
const ast = parser.parse(code);
// 2.traverse 对AST进行递归遍历
const visitor = {
  VariableDeclaration(path) {
    // console.log(path.node); // 当前节点
    path.node.kind = "let";
    // 写入文件,更方便查看, 控制台打印太长了
    fs.writeFile(
      "VariableDeclaration.json",
      JSON.stringify(path.node),
      function (err) {
        console.log(err);
      }
    );
  },
  enter(path) {
    if (types.isVariableDeclaration(path.node)) {
      console.log("isVariableDeclaration!");
    }
  },
};
traverse.default(ast, { ...visitor });
// 3. generator 将 AST 转回成代码
const result = generator.default(ast).code;
console.log(result);
