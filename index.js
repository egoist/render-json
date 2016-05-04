'use strict'
const fs = require('fs')
const assert = require('assert')
const co = require('co')
const cons = require('consolidate')
const pify = require('pify')
const readJson = require('read-package-json')
const pathExists = require('path-exists')

module.exports = co.wrap(function* (options) {
  options = options || {}

  const input = options.input
  const output = options.output
  const template = options.template

  assert(input, 'Expected the path of input JSON file')
  assert(output, 'Expected the path of output file')
  assert(template, 'Expected the path of template')

  const engine = options.engine || 'handlebars'
  
  let parsed
  if (typeof input === 'object') {
    parsed = input
  } else {
    parsed = options.isPackageJson ?
      yield pify(readJson)(input) :
      JSON.parse(yield pify(fs.readFile)(input, 'utf8'))
  }
  const data = {
    json: parsed,
    year: new Date().getFullYear()
  }

  const result = yield cons[engine](template, Object.assign({}, data))

  if (!options.force) {
    if (yield pathExists(output)) {
      throw new Error(`${output} already exists`)
    }
  }

  yield pify(fs.writeFile)(output, result, 'utf8')
  return data
})
