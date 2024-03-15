#!/usr/bin/env node
'use strict';

const {Command} = require('commander');
const pkg = require('./package.json');
const create = require('./createKdesignApp.js');
const program = new Command();

program
  .name('create-kdesign-app')
  .description('CLI to create kdesign App')
  .usage('<projectName> | [options]')
  .version(pkg.version);

create(process.argv.length > 2 ? process.argv?.[2] : 'my-app', pkg.version)

program.parse(process.argv);



