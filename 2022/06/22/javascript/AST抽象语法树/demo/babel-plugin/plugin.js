module.exports = function (babel) {
  const { types: t, template } = babel;
  const visitor = {
    VariableDeclaration(path,state) {
      console.log(state.opts.a)
      path.node.kind = "let";
    },
  };
  return {
    visitor,
  };
};
