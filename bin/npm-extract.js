#!/usr/bin/env node
'use strict'

var path     = require('path')
var fs       = require('fs')
var dir      = process.cwd()
var filePath = path.join(dir, 'package.json')
var sections = {D: 'devDependencies', S: 'dependencies'}
var stdout   = process.stdout

var pkg = ''

function generate (section) {
  var list = sections[section], coll = pkg[list]

  if (coll) {
    for (var key of Object.keys(coll)) {
      var data = coll[key]
      var r    = /^([^\d])*([\d\.]+)/.exec(data)
      if (!r) throw new Error(`Can't parse "${key}": "${data}" in "${list}"`)
      stdout.write(`npm i -${section} ${key}@${r[2]}\t# ${data}\n`)
    }
  }
}

process.stdin.setEncoding('utf8')

process.stdin.on('readable', function () {
  const chunk = process.stdin.read()
  if (chunk !== null) pkg += chunk
})

process.stdin.on('end', function () {
  if (!pkg) return
  pkg = JSON.parse(pkg)
  generate('S')
  generate('D')
})

setImmediate(function () {
  if (pkg) return         //  We are reading stdin already!

  try {
    pkg = JSON.parse(fs.readFileSync(filePath))
  } catch (e) {
    var m = e.code === 'ENOENT' ? 'No such file: \"' + filePath + '"' : e.message
    process.stderr.write(m + '\n')
    process.exit(1)
  }
  generate('S')
  generate('D')
  process.exit(0)
})
