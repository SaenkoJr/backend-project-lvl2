import formatAsObject from './formatAsObject';
import formatAsPlainText from './formatAsPlainText';
import formatAsJson from './formatAsJson';

const formatters = {
  object: formatAsObject,
  plain: formatAsPlainText,
  json: formatAsJson,
};

export default (ast, format) => {
  try {
    return formatters[format](ast);
  } catch (e) {
    throw new Error('Unsupported format');
  }
};
