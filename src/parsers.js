import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (ext) => {
  if (!parsers[ext]) {
    throw new Error(
      `Unexpected file extension: ${ext}. Only json, yaml and ini files are supported.`,
    );
  }

  return parsers[ext];
};
