---
title: Github工作流
published: 2026-10-20
description: '初接触git&github协作'
image: ''
tags: [协作]
category: '技术'
draft: false
lang: ''
---

**fork原仓库 & clone 自己的fork**  : 将main代码全部拉取到本地  再添加 upstream 远端仓库


```bash
git clone 
cd 仓库
git remote add upstream 
```

**新建分支** ： 根据实际工作需要创建分支，避免影响 main分支的正常功能。参照业务规范来进行分支的命名等细致要求

**修改代码** 

**提交代码**： 使用命令 git add git commit 来提交你的代码 

**远程 main 分支是否发生改动**

否： git push 提交合并请求 如若本次合并有过多的commit 视情况进行Squash merge

是：为避免冲突 先切换回main分支 拉取远端upstream  即 将远端main分支同步到本地

 之后切换回自己的分支 将main分支的commit rebase到自己的分支 即 保留 main分支提交代码并添加自己的提交

**是否发生冲突** 

是 ： 通常需要手动融合代码 解决冲突再
```bash
git add 文件
git rebase --continue 
```

否 ：git push 

至此 一条pr 产出，等待审查合并,合并之后删除分支