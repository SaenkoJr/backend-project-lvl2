#!/usr/bin/env node

import program from 'commander';

import gendiff from '..';

program.version('0.6.1');

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'object')
  .arguments('<firstConfig> <secondConfig>')
  .action((filepath1, filepath2) => {
    try {
      const diff = gendiff(filepath1, filepath2, program.format);

      console.log(diff);
      process.exit(0);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });

program.parse(process.argv);
