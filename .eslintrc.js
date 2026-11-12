/*
 * The site's scripts are plain <script> files that share one global scope (no build step), so the
 * names each file declares at its top level are collected here and given to every other file.
 * That keeps no-undef on: a typo or a missing <script> tag is still caught.
 */
const fs = require("fs");
const espree = require("espree");

const scripts = [
  ...fs.readFileSync(`${__dirname}/index.html`, "utf8").matchAll(/<script src="([^"]+)"/g),
].map((m) => m[1]);
const globals = {};
for (const file of scripts) {
  const ast = espree.parse(fs.readFileSync(`${__dirname}/${file}`, "utf8"), { ecmaVersion: 2022 });
  for (const node of ast.body) {
    if (node.type === "FunctionDeclaration") globals[node.id.name] = "readonly";
    if (node.type === "VariableDeclaration")
      for (const d of node.declarations) globals[d.id.name] = node.kind === "const" ? "readonly" : "writable";
  }
}

module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  parserOptions: { ecmaVersion: 2022, sourceType: "script" },
  globals,
  rules: {
    "no-undef": "error",
    /* top-level names are used by the other files, so only local ones are checked */
    "no-unused-vars": ["error", { vars: "local", args: "none" }],
    "no-redeclare": ["error", { builtinGlobals: false }],
    "no-unreachable": "error",
    "prefer-const": "error",
    eqeqeq: ["error", "smart"],
    "no-var": "error",
  },
  overrides: [
    { files: [".eslintrc.js", "playwright.config.js"], env: { node: true, browser: false } },
    /* tests run in Node; their page.evaluate() callbacks run in the browser, without the site's globals */
    {
      files: ["tests/**"],
      env: { node: true, browser: true },
      globals: Object.fromEntries(Object.keys(globals).map((name) => [name, "off"])),
    },
  ],
};
