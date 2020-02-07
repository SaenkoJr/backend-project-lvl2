#!/usr/bin/env node

import program from 'commander';

import gendiff from '..';

program
  .version('0.2.0');

program
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((filepath1, filepath2) => {
    const diff = gendiff(filepath1, filepath2);

    console.log(diff);
  });

program.parse(process.argv);
