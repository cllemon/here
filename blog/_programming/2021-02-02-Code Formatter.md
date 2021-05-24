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

以下描述了几种不同类型的项目，规范化实践，可根据项目类型食用。

### JavaScript/TypeScript Library

针对 JavaScript/TypeScript 基础库，的规范配置实践

#### Prettier + ESlint

```sh
# 工具安装

```

### Vue Application

### React Application

## 规范化项目提交日志
