import pretty from './pretty';
import plain from './plain';
import json from './json';

const formatters = {
  pretty,
  plain,
  json,
};

export default (ast, format) => {
  if (!formatters[format]) {
    throw new Error(`Unsupported ${format} format. Try 'gendiff -h' for more information`);
  }

  return formatters[format](ast);
};
