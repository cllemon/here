---
title: 经常用到的 Git 命令
summary: Git 的一些常见命令使用与记录
date: 2017-11-02
author: Wooden Kite
location: HuaiNan.AnHui
---

## 分区概念简述

```sh
  （ 写代码 ）           （ 文件池 ）        （ git log 查看 ）    （ github 等平台 ）
Working Directory        Stage             Commit History          Remote
    工作区   ==========>  暂存区   ==========>   版本库   ==========> 远程仓库

            git add              git commit             git push
```

## 基本操作

```sh
# 初始化，使项目使用版本控制
~/project :  git init
# Initialized empty Git repository in /github/ii/xxx/xxx/.git/

# 关联远程仓库
~/project [master ±] : git remote add origin git@github.com:kite/test.git

# 在工作区新建两个文件
~/project [master ±] : touch index.js utils.js

# 查看仓库状态（修改情况）
~/project [master ±] : git status

# 添加需要添加的文件到暂存区
~/project [master ±] : git add -A # 添加所有修改的文件
~/project [master ±] : git add * # 添加所有修改的文件
~/project [master ±] : git add . # 添加所有修改的文件
~/project [master ±] : git add utils.js # 添加指定的文件到暂存区

# 将文件从 暂存区 中移除
~/project [master ±] : git reset HEAD -- utils.js # 将之前添加的暂存区的文件 utils 移除暂存区
~/project [master ±] : git reset HEAD -- # 将 暂存区 中的所有文件移除

# 提交修改的代码
~/project [master ±] : git commit -m 'feat: add utils file.'

[master (root-commit) 6769de1] feat: add utils file.
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 utils.js

# 查看提交日志
~/project [master ±] : git log --graph

# 与远程分支建立连接，并推送代码到远程仓库（之后推送代码使用 git push 即可）
~/project [master ±] : git push --set-upstream origin master

# 下次开发前，拉取远程代码，使本地代码与远程保持一致（保持拉代码的习惯😯）
~/project [master ±] : git pull
```

## Git 配置

### 本地项目配置

```sh
# 查看本地项目 git 仓库的配置列表
~/project [master ±] : git config --local -l

# 添加一些配置
~/project [master ±] : git config --local  user.name "kite_special"

# 或者更直接点： 编辑本地 git 仓库的配置文件 添加一些 “常用配置”
~/project [master ±] : vi .git/config

[core]
        ...

[remote "origin"]
        ...

[branch "master"]
        ...

[user]
        name = kite_local_project
        email = kite.local.project@gmail.com
```

### 全局配置

```sh
# 查看全局配置
~/project [master ±] : git config --global -l

# 添加一些全局配置
~/project [master ±] : git config --local  user.name "kite"

# 或直接编辑 ~/.gitconfig (👇 下面是一些简单的常用配置 👇)
~/project [master ±] : vi ~/.gitconfig

[core]
        editor = vim
[user]
        name = kite
        email = hnx.lemon@gmail.com

[alias]
        a = add .
        s = status
        l = log --graph
        ct = commit -m
        co = checkout
```

## 多人协作开发

```sh
####################################################################
##    多个人开发同一个项目，最终将修改的代码 合并 到同一个主分支 master     ##
####################################################################

****************
*   基本操作     *
****************

# 在开发新功能前，首先拉代码，保持本地和远程仓库代码同步
~/project [master ±] : git pull # 若本地原先没有使用 git clone 将代码克隆到本地

# 创建一个自己的开发分支 (从当前最新的节点开始) 并切过去
~/project [master ±] : git co -b dev
Switched to a new branch 'dev'

------------------------------------------------------------------------------------
# 或者 从某一次提交开始创建新的分支（若需要的话）
~/project [master ±] : git log --graph # 查看提交历史，选取所需开始的 commit ID
~/project [master ±] : git co 45b904 -b dev
------------------------------------------------------------------------------------

# 同步本地分支到远程仓库
~/project [dev ±] : git push origin dev:dev
# 建立与上游分支的联系
~/project [dev ±] : git push --set-upstream origin dev

# balala 开始开发一个功能模块，过程中可能在本地提交了多次小的改动，比如这样
~/project [dev ±] : git ct 'feat: 完成功能模块 -- 子功能1'
~/project [dev ±] : git ct 'feat: 完成功能模块 -- 子功能2'
~/project [dev ±] : git ct 'feat: 完成功能模块 -- 子功能3'
~/project [dev ±] : git ct 'feat: 完成功能模块 -- 子功能4'
~/project [dev ±] : git ct 'feat: 完成功能模块 -- 完成收尾'

# 终于，完成了功能模块的开发，开始提交代码到远程仓库

# 将 dev 分支上开发的功能（提交了多次 commit）合并到远程 master 分支
# 合并之前，由于之前提交了很多零散的 commit，但实际上这部分代码提交只是某个功能模块相关，
# 为了保证提交日志历史干净，我们将 dev 分支的 commit 进行合并
# 如这里是：将 “feat: 完成功能模块 -- 子功能1、子功能2、子功能3、子功能4、完成收尾 ”
#         合并为一条日志信息 “xxx功能模块开发完成”
# 合并多条 commit
~/project [dev ±] : git rebase -i

--------------------------------------------------------------------------------
pick feat: 完成功能模块 -- 子功能1
pick feat: 完成功能模块 -- 子功能1
pick feat: 完成功能模块 -- 子功能1
pick feat: 完成功能模块 -- 子功能1
pick feat: 完成功能模块全部完成

# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.

"将 pick -> s 保存即可"
# 若有冲突，解决冲突，然后添加到暂存区

# 注：若要取消 rebase 执行 git rebase --abort
--------------------------------------------------------------------------------

# 继续 rebase
~/project [dev ±] : git rebase --continue

# 切回 主分支
~/project [dev ±] : git co master

# 将 dev 开发的内容合并到主分支 master 上
~/project [master ±]: git merge dev # Merge branch 'dev' into 'master'

# 查看状态
~/project [master ±]: git status

On branch master
Your branch is ahead of 'origin/master' by 6 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

# 将 merge 的内容推送到远程仓库
~/project [master ±]: git push
```

## 参考

- [連猴子都能懂的 Git 入門指南](https://backlog.com/git-tutorial/tw/intro/intro1_1.html)
- [zlargon/git-tutorial](https://github.com/zlargon/git-tutorial)
  <!-- https://stackoverflow.com/questions/37770467/why-do-i-have-to-git-push-set-upstream-origin-branch -->

<br>
<hr>

_文章写于 **2017 年 11 月** 迁移修饰于 **2021 年 02 月**_
