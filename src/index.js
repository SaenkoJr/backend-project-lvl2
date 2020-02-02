import commander from 'commander';

const program = new commander.Command();

export default () => {
  program.version('0.0.2');
  program.parse(process.argv);
};
