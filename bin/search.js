#!/usr/bin/env node

// ProcessingInstruction('commander')
// 主要命令入口文件，这里引入了 self-search.js 命令文件

process.title = 'search'

require('commander')
.version(require('../package').version)
.usage('<command> [options]')
.option('-s, --search', '搜索')
.command('search', 'search file from a template (short-cut alias: "g"')
.parse(process.argv)


require('./self-search.js');
