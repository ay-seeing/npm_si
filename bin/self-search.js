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
.action((type, name)=>{
    se.pwd()
})




program.parse(process.argv)