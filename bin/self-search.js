#!/usr/bin/env node

const program = require('commander');
// const chalk = require('chalk')
const se = require('../lib/file.js')

program
.command('se')
.description('quick se your file')
.alias('s')
.action((type, name)=>{
    se.readFile()
})




program
.command('pwd')
.description('quick se your path')
.alias('p')
.option('-a, --app', '搜索app')
.action((type, name)=>{
    se.pwd()
})



// 多个命令，共用一个 parse，多次调用无效
program.parse(process.argv)