#!/usr/bin/env node
require('colors')
const fs = require('fs')
const { Command } = require('commander')
const pkg = require('./package.json')
const clone = require('./clone')
const program = new Command();

program
  .name('create-kdesign-app')
  .description('CLI to create kdesign App')
  .usage('<projectName> | [options]')
  .version(pkg.version)

process.argv.length < 3 && (process.argv = [...process.argv, '-h'])
const projectName = process.argv[2]

if (projectName) {
  fs.exists(projectName, (exists) => {
    exists ? console.log('The project already exists, please check the project name.'.red) : clone(projectName)
  })
}

program.parse(process.argv)



