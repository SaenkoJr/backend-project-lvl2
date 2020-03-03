import formatAsObject from './formatAsObject';
import formatAsPlainText from './formatAsPlainText';

const formatters = {
  object: formatAsObject,
  plain: formatAsPlainText,
};

export default (ast, format) => formatters[format](ast);
