function containsThrow(node) {
  if (typeof node !== "object" || node === null) return false;
  if (node.type === "ThrowStatement") return true;
  return Object.keys(node).some((field) => {
    if (field === "parent") {
      return false;
    } else if (Array.isArray(node[field])) {
      return node[field].some(containsThrow);
    }
    return containsThrow(node[field]);
  });
}

module.exports = {
  rules: {
    "no-catch-all": {
      create: function (context) {
        return {
          CatchClause(node) {
            if (!containsThrow(node.body)) {
              context.report({
                node: node,
                message: "catch block should rethrow unexpected errors",
              });
            }
          },
        };
      },
    },
  },
};
