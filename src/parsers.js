import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (ext) => {
  try {
    return parsers[ext];
  } catch (e) {
    throw new Error('Unsupported filetype');
  }
};
