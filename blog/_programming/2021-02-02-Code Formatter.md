---
title: 制定前端团队的代码规范
summary: 论述代码规范化重要性，业界相关工具、并针对不同类型的代码给出推荐配置
date: 2021-02-02
author: Wooden Kite
location: HuaiNan.AnHui
---

## 前言

随着公司业务不断发展、团队也随之不断壮大（开发人员、项目数量以及对应项目的代码量激增），势必会面临一些问题，如：团队成员代码风格不尽相同，导致内部代码风格迥异；且团队成员水准不一，提交的代码可能存在潜在风险；在版本控制方面，项目提交的日志可能会混乱，这也对项目回溯带来了不小的挑战，尤其对内部基础库建设上（完整规范详实的提交记录有利于生成项目 CHANGELOG.md）。因此，我们需要建立一些规范来尽可能的规避上述风险，使得团队良性发展。

## 业界相关辅助工具

- [Prettier](https://github.com/prettier/prettier) 代码格式化工具，通过解析代码并使用自己的规则重新打印代码，从而实现一致的样式，并在必要时包装代码
- [ESLint](https://github.com/eslint/eslint) 常用于检查常见的 JavaScript 代码错误，也可以进行代码风格检查
- [StyleLint](https://github.com/stylelint/stylelint) 强大的现代化 linter，可帮助您避免错误并在样式中强制执行约定

## 代码规范配置实践

业内在代码规范化方面，有多种方案，这里主要以 `Prettier + ESlint + StyleLint` 三种工具结合使用的方案展开讨论。

首先在落地规范配置之前，我们需要制定符合团队的规范，关于制定方式，这里可以推荐一种形式，根据语言类型列一个规范清单，在团队内展开征询，再由核心人员结合征询情况、团队实际情况进行收敛，产出最终的规范。然后在通过工具分享规范配置，打成一个 npm 包，在团队内共享使用。

### 一些共享的配置规范

#### 写本文时所总结的规范配置（仅供参考）

**[prettier config](https://prettier.io/docs/en/options)**

```json
{
  /**
   * 使用制表符而不是空格缩进行
   * default: false
   */
  "useTabs": false,
  /**
   * 指定每个缩进级别的空格数
   * default: 2
   */
  "tabWidth": 2,
  /**
   * 指定换行行长
   * default: 80
   */
  "printWidth": 90,
  /**
   * 是否在语句末尾打印分号
   * default: true
   */
  "semi": false,
  /**
   * 使用单引号而不是双引号
   * default: false
   */
  "singleQuote": true,
  /**
   * 是否追加尾逗号, 可选值:
   *   - "none" - 不追加
   *   - "es5" - 追加在 ES5 中有效的尾逗号，如：objects, arrays...
   *   - "all" - 尽可能使用尾逗号
   */
  "trailingComma": "es5",
  /**
   * 将多行 JSX 元素的 > 放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）如：
   *    <button
   *      className="prettier-class"
   *      id="prettier-id"
   *      onClick={handleClick}> # true
   *    > # false
   *      Click Here
   *    </button>
   */
  "jsxBracketSameLine": true
}
```

我们将定制好的配置规则发一个[配置共享](https://prettier.io/docs/en/configuration.html#sharing-configurations)的包，以便用于各个库。如：「[@coding-standard/prettier-config](https://www.npmjs.com/package/@coding-standard/prettier-config)」。

**[eslint config](https://eslint.org/docs/user-guide/configuring/configuration-files)**

```json
{
  // PART:  潜在错误
  /**
   * 🚬 禁止出现空语句块
   */
  "no-empty": ["error", { "allowEmptyCatch": true }],
  /**
   * 🚬 禁用 debugger
   */
  "no-debugger": "error",
  /**
   * 🚬 禁止不规则的空白
   */
  "no-irregular-whitespace": [
    "error",
    { "skipComments": true, "skipTemplates": true }
  ],
  /**
   * 强制 “for” 循环中更新子句的计数器朝着正确的方向移动
   * 目的: 避免陷入无限循环
   */
  "for-direction": "error",
  /**
   * 强制 getter 函数中出现 return 语句
   */
  "getter-return": "error",
  /**
   * 禁止使用异步函数作为 Promise executor
   * 原因: 如果异步 executor 函数抛出一个错误，这个错误将会丢失，
   *      并且不会导致新构造的 Promise 被拒绝
   */
  "no-async-promise-executor": "error",
  /**
   * 禁止与 -0 进行比较
   * 原因: 0 === -0 || 0 === +0 => true
   *      应该使用：Object.is(x, -0)
   */
  "no-compare-neg-zero": "error",
  /**
   * 禁止条件表达式中出现赋值操作符
   * 原因：在条件语句中，很容易将一个比较运算符（像 ==）错写成赋值运算符（如 =）
   *      在条件语句中使用赋值操作符是有效的。然而，很难判断某个特定的赋值是否是有意为之
   */
  "no-cond-assign": "error",
  /**
   * 禁止在条件中使用常量表达式
   */
  "no-constant-condition": "error",
  /**
   * 禁止在正则表达式中使用控制字符
   */
  "no-control-regex": "error",
  /**
   * 禁止 function 定义中出现重名参数
   */
  "no-dupe-args": "error",
  /**
   * 禁止对象字面量中出现重复的 key
   */
  "no-dupe-keys": "error",
  /**
   * 禁止出现重复的 case 标签
   * 禁止在 switch 语句中的 case 子句中出现重复的测试表达式
   */
  "no-duplicate-case": "error",
  /**
   * 禁止在正则表达式中使用空字符集
   */
  "no-empty-character-class": "error",
  /**
   * 禁止对 catch 子句的参数重新赋值
   * 在 try 语句中的 catch 子句中，如果意外地（或故意地）给异常参数赋值，是不可能引用那个位置的错误的
   * 由于没有 arguments 对象提供额外的方式访问这个异常，对它进行赋值绝对是毁灭性的。
   */
  "no-ex-assign": "error",
  /**
   * 禁止不必要的布尔转换 【--fix】
   */
  "no-extra-boolean-cast": "error",
  /**
   * 禁止不必要的分号 【--fix】
   * 书写错误：var x = 5;;
   */
  "no-extra-semi": "error",
  /**
   * 禁止对 function 声明重新赋值
   */
  "no-func-assign": "error",
  /**
   * 禁止在嵌套的块中出现变量声明或 function 声明
   * 在 ES6 之前的 JavaScript 中，函数声明只能在程序或另一个函数体的顶层，尽管解析器有时会错误地接受它们。
   * 这只适用于函数声明；命名的或匿名的函数表达式是可以出现在任何允许的地方.
   * 把声明放在程序或函数体的顶部会使代码更清晰，在任何地方随意声明变量的做法通常是不可取的
   */
  "no-inner-declarations": "error",
  /**
   * 禁止 RegExp 构造函数中存在无效的正则表达式字符串
   */
  "no-invalid-regexp": "error",
  /**
   * 不允许在字符类语法中出现由多个代码点组成的字符
   */
  "no-misleading-character-class": "error",
  /**
   * 禁止把全局对象作为函数调用
   * ECMAScript 提供了几个全局对象，旨在直接调用。
   * 这些对象由于是大写的（比如 Math 和 JSON、Reflect）看起来像是构造函数，
   * 但是如果你尝试像函数一样执行它们，将会抛出错误
   */
  "no-obj-calls": "error",
  /**
   * 禁止直接调用 Object.prototypes 的内置属性
   * foo.hasOwnProperty("bar"); => Object.prototype.hasOwnProperty.call(foo, "bar");
   */
  "no-prototype-builtins": "error",
  /**
   * 禁止正则表达式字面量中出现多个空格 【--fix】
   * 很难断定想要匹配多少个空格。最好是只使用一个空格，然后指定需要多少个
   * /foo   bar/; => /foo {3}bar/;
   */
  "no-regex-spaces": "error",
  /**
   * 禁用稀疏数组
   * [ "red",, "blue" ] => [ "red", "blue", ];
   */
  "no-sparse-arrays": "error",
  /**
   * 禁止出现令人困惑的多行表达式
   */
  "no-unexpected-multiline": "error",
  /**
   * 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
   */
  "no-unreachable": "error",
  /**
   * 禁止在 finally 语句块中出现控制流语句
   * JavaScript 暂停 try 和 catch 语句块中的控制流语句，直到 finally 语句块执行完毕。所以，
   * 当 return、throw、break 和 continue 出现在 finally 中时， try 和 catch 语句块中的控制流语句将被覆盖
   */
  "no-unsafe-finally": "error",
  /**
   * 禁止对关系运算符的左操作数使用否定操作符
   * if (!key in object) {} => if (!(key in object)) {}
   */
  "no-unsafe-negation": "error",
  /**
   * 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值
   */
  "require-atomic-updates": "error",
  /**
   * 要求使用 isNaN() 检查 NaN
   */
  "use-isnan": "error",
  /**
   * 强制 typeof 表达式与有效的字符串进行比较
   */
  "valid-typeof": "error",
  // PART:  最佳实践
  /**
   * 🚬 强制所有控制语句使用一致的括号风格【--fix】
   */
  "curly": ["error", "multi"],
  /**
   *  🚬 强要求使用 === 和 !==【--fix】
   */
  "eqeqeq": ["error", "always"],
  /**
   * 🚬 禁用 eval()
   *   允许间接调用 eval。间接调用 eval 相对于直接调用 eval 危害性较低，因为不会动态改变作用域
   *   window.eval("var a = 0");
   *   global.eval("var a = 0");
   */
  "no-eval": ["error", { "allowIndirect": true }],
  /**
   * 🚬 禁止数字字面量中使用前导和末尾小数点
   *    .5; 2.; => 0.5; 2.0;
   */
  "no-floating-decimal": "error",
  /**
   * 🚬 禁止使用短符号进行类型转换 【--fix】
   * "" + foo;foo += ""; => String(foo);foo = String(foo);
   */
  "no-implicit-coercion": ["error", { "string": true }],
  /**
   * 🚬 禁用魔术数字
   *    旨在确保将具体的数字声明为意义明确的常量，从而使代码更加可读并且易于重构。
   */
  "no-magic-numbers": ["error", { "ignoreArrayIndexes": true }],
  /**
   * 🚬 禁止在 return 语句中使用赋值语句
   *    return foo = bar + 2; => return (foo = bar + 2);
   */
  "no-return-assign": "error",
  /**
   * 🚬 禁止自身比较
   *    唯一可能会对变量自身做比较时候是当你在测试变量是否是 NaN
   *    使用 typeof x === 'number' && isNaN(x) 或者 Number.isNaN ES2015 函数 而不是变量自身比较
   */
  "no-self-compare": "error",
  /**
   * 🚬 禁止抛出异常字面量
   *    throw "error"; => throw new Error("error");
   *    目的在于保持异常抛出的一致性，通过禁止抛出字面量和那些不可能是 Error 对象的表达式
   */
  "no-throw-literal": "error",
  /**
   * 禁用出现未使用过的标【--fix】
   */
  "no-unused-labels": "error",
  /**
   * 	禁止出现未使用过的变量
   */
  "no-unused-vars": "error",
  /**
   * 禁止不必要的 catch 子句
   */
  "no-useless-catch": "error",
  /**
   * 禁用不必要的转义字符
   */
  "no-useless-escape": "error",
  /**
   * 禁用 with 语句
   */
  "no-with": "error",
  /**
   * 禁止多次声明同一变量
   */
  "no-redeclare": "error",
  /**
   * 禁止自我赋值
   */
  "no-self-assign": "error",
  /**
   * 禁止将标识符定义为受限的名字
   */
  "no-shadow-restricted-names": "error",
  /**
   * 不允许在 case 子句中使用词法声明
   * 避免访问未经初始化的词法绑定以及跨 case 语句访问被提升的函数。
   */
  "no-case-declarations": "error",
  /**
   * 禁止使用空解构模式
   * 目的在于标记出在解构对象和数组中的任何的空模式
   */
  "no-empty-pattern": "error",
  /**
   * 禁止删除变量
   */
  "no-delete-var": "error",
  /**
   * 禁止对原生对象或只读的全局对象进行赋值
   */
  "no-global-assign": "error",
  /**
   * 禁止 case 语句落空
   */
  "no-fallthrough": "error",
  /**
   * 禁用未声明的变量，除非它们在 \/\*global \*\/ 注释中被提到
   */
  "no-undef": "error",
  /**
   * 禁用八进制字面量
   * 在 JavaScript 代码中，八进制的前导数字零作为其标示一致是导致混淆和错误的来源，ECMAScript 5 已经弃用了八进制字面量。
   * var num = 071; => var num  = "071";
   */
  "no-octal": "error",
  // PART:  只与 ES6 有关, 即通常所说的 ES2015
  /**
   * 要求在构造函数中有 super() 的调用
   */
  "constructor-super": "error",
  /**
   * 禁止修改类声明的变量
   */
  "no-class-assign": "error",
  /**
   * 禁止修改 const 声明的变量
   */
  "no-const-assign": "error",
  /**
   * 禁止 Symbolnew 操作符和 new 一起使用
   * var foo = new Symbol('foo'); => var foo = Symbol('foo');
   */
  "no-new-symbol": "error",
  /**
   * 禁止在构造函数中，在调用 super() 之前使用 this 或 super
   */
  "no-this-before-super": "error",
  /**
   * 禁止类成员中出现重复的名称
   */
  "no-dupe-class-members": "error",
  /**
   * 在if-else-if链中禁止重复条件
   */
  "no-dupe-else-if": "error",
  /**
   * 禁止分配给导入的绑定
   */
  "no-import-assign": "error",
  /**
   * 不允许从setter返回值
   */
  "no-setter-return": "error",
  /**
   * 要求 generator 函数内有 yield
   */
  "require-yield": "error",
  // PART:  风格指南
  /**
   * 禁止空格和 tab 的混合缩进
   */
  "no-mixed-spaces-and-tabs": "error"
}
```

和 prettier 一样，在制定好规则集之后，同样发一个[配置共享](https://eslint.org/docs/developer-guide/shareable-configs)的包，用于团队内的各个项目使用。如：[@coding-standard/eslint-config-recommended](https://www.npmjs.com/package/@coding-standard/eslint-config-recommended)

#### 业内比较流行的配置规范

- [eslint-config-recommended](.) 问题 + 样式
- [airbnb](.) 样式
- [standard](.) 样式
- [google](.) 样式

<br />

有了配置规范之后，如何食用呢？接下来，将分别论述在不同项目类型下，如何接入这些配置。

### 不同项目类型下的配置规范接入

#### 纯 JavaScript/TypeScript 实现的基础库的规范配置实践

#### 工具安装

```sh
# 基础工具
$ npm i -D eslint prettier
# 前文生成的共享配置包
$ npm i -D @coding-standard/prettier-config @coding-standard/eslint-config-recommended
# 用于将 Prettier 作为 ESLint 规则运行，并将差异报告为单个 ESLint 问题
$ npm i -D eslint-plugin-prettier
# 用于关闭 ESLint 所有不必要的或可能与 Prettier 冲突的规则
$ npm i -D eslint-config-prettier

# 生成配置文件
$ touch .eslintrc
$ vi package.json
```

#### 配置文件

```js
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  globals: {
    process: true,
    module: true,
  },
  extends: [
    "@coding-standard/eslint-config-recommended",
    "plugin:prettier/recommended", // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
  ],
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "no-console": process.env.NODE_ENV !== "production" ? "always" : "error",
    "no-debugger": process.env.NODE_ENV !== "production" ? "always" : "error",
  },
};
```

```json
// package.json
{
  "scripts": {
    "lint:script": "eslint --ext '.js,.jsx' src",
    "lint:script:fix": "npm run lint:script -- --fix",
    "lint:format:fix": "prettier -cw 'src/**/*'" // 可不需要该命令
  },
  "prettier": "@coding-standard/prettier-config"
}
```

#### 适配 TS 的改造

```diff
// 安装两个 ts 解析相关的包
+ // npm i -D @typescript-eslint/parser@latest @typescript-eslint/eslint-plugin@latest

// .eslintrc.js
module.exports = {
  root: true,
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  globals: {
    process: true,
    module: true,
  },
  extends: [
    "@coding-standard/eslint-config-recommended",
+   "plugin:@typescript-eslint/recommended", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/README.md
    "plugin:prettier/recommended", // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
  ],
+ parser: "@typescript-eslint/parser",
  parserOptions: {
+   ecmaVersion: 12,
    sourceType: "module",
  },
+ plugins: ["@typescript-eslint"],
  rules: {
    "no-console": process.env.NODE_ENV !== "production" ? "always" : "error",
    "no-debugger": process.env.NODE_ENV !== "production" ? "always" : "error",
  },
};
```

> **Demo 演示用例地址：**
>
> JavaScript 项目用例：[coding-standard/library](https://github.com/cllemon/coding-standard/tree/JavaScript/library)
>
> TypeScript 项目用例：[coding-standard/library](https://github.com/cllemon/coding-standard/tree/TypeScript/library)

### Vue Application

```sh
TODO:
```

### React Application

## 规范化项目提交日志

```sh
# 针对为 Vue 生态实现的一些库
~/cwd : npm i -D eslint-plugin-vue

# 针对为 React 生态实现的一些库
~/cwd : npm i -D eslint-plugin-react

# 使用 TypeScript 语言
~/cwd : npm i -D @typescript-eslint/eslint-plugin
```
