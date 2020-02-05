import commander from 'commander';

const program = new commander.Command();

export default () => {
  program
    .version('0.0.4');

  program
    .option('-f, --format [type]', 'output format')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(firstConfig);
      console.log(secondConfig);
    });

  program.parse(process.argv);
};
