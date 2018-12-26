#!/usr/bin/env node

// ProcessingInstruction('commander')

process.title = 'search'

require('commander')
.version(require('../package').version)
.usage('<command> [options]')
.option('-s, --search', '搜索')
.command('search', 'search file from a template (short-cut alias: "g"')
.parse(process.argv)


require('./self-search.js');