#!/usr/bin/env node

import program from 'commander';

import gendiff from '..';

program
  .version('0.5.0');

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'object')
  .arguments('<firstConfig> <secondConfig>')
  .action((filepath1, filepath2) => {
    const diff = gendiff(filepath1, filepath2, program.format);

    console.log(diff);
  });

program.parse(process.argv);
