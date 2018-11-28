#!/usr/bin/env node
'use strict'

// const _        = require('lodash')
const path     = require('path')
const fs       = require('fs')
const dir      = '/Users/villema/dev/aloe'
const filePath = path.join(dir, 'package.json')
const sections = {D: 'devDependencies', S: 'dependencies'}
const stdout   = process.stdout

let pkg = void 0

const generate = (section) => {
  let list = sections[section], coll = pkg[list]

  for (const key of Object.keys(coll)) {
    const data = coll[key]
    const r    = /^\^?([\d\.]+)/.exec(data)
    if (!r) throw new Error(`Can't parse "${key}": "${data}" in "${list}"`)
    stdout.write(`npm i -${section} ${key}@${r[1]}\n`)
  }
}

try {
  pkg = JSON.parse(fs.readFileSync(filePath))
} catch (e) {
  console.error(e)
  process.exit(1)
}
generate('S')
generate('D')
