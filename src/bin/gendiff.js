#!/usr/bin/env node

import program from 'commander';

import gendiff from '..';

program.version('0.6.2');

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'specify output format: pretty, plain, json', 'pretty')
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
