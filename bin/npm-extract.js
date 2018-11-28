#!/usr/bin/env node
'use strict'

// var _        = require('lodash')
var path     = require('path')
var fs       = require('fs')
var dir      = process.cwd()
var filePath = path.join(dir, 'package.json')
var sections = {D: 'devDependencies', S: 'dependencies'}
var stdout   = process.stdout

var pkg = void 0

var generate = (section) => {
  var list = sections[section], coll = pkg[list]

  if (coll) {
    for (var key of Object.keys(coll)) {
      var data = coll[key]
      var r    = /^\^?([\d\.]+)/.exec(data)
      if (!r) throw new Error(`Can't parse "${key}": "${data}" in "${list}"`)
      stdout.write(`npm i -${section} ${key}@${r[1]}\n`)
    }
  }
}

try {
  pkg = JSON.parse(fs.readFileSync(filePath))
} catch (e) {
  console.log(e)
  var m = e.code === 'ENOENT' ? 'No such file: \"' + filePath + '"' : e.message
  process.stderr.write(m + '\n')
  process.exit(1)
}
generate('S')
generate('D')
