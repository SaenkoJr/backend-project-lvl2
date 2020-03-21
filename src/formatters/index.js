import formatAsObject from './formatAsObject';
import formatAsPlainText from './formatAsPlainText';
import formatAsJson from './formatAsJson';

const formatters = {
  object: formatAsObject,
  plain: formatAsPlainText,
  json: formatAsJson,
};

export default (ast, format) => {
  if (!formatters[format]) {
    throw new Error(`Unsupported ${format} format`);
  }

  return formatters[format](ast);
};
