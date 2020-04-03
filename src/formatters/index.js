import formatAsObject from './formatAsObject';
import formatAsPlainText from './formatAsPlainText';
import formatAsJson from './formatAsJson';

const formatters = {
  pretty: formatAsObject,
  plain: formatAsPlainText,
  json: formatAsJson,
};

export default (ast, format) => {
  if (!formatters[format]) {
    throw new Error(`Unsupported ${format} format. Try 'gendiff -h' for more information`);
  }

  return formatters[format](ast);
};
