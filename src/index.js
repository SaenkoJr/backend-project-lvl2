import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import parsers from './parsers';

export default (filepath1, filepath2) => {
  const ext = path.extname(filepath1).slice(1);
  const parser = parsers[ext];

  const before = parser(fs.readFileSync(filepath1, 'utf-8'));
  const after = parser(fs.readFileSync(filepath2, 'utf-8'));
  const keys = _.union(Object.keys(before), Object.keys(after));

  if (_.isEqual(before, after)) {
    return '';
  }

  const result = keys.map((key) => {
    if (!_.has(before, key)) {
      return `  + ${key}: ${after[key]}`;
    }

    if (!_.has(after, key)) {
      return `  - ${key}: ${before[key]}`;
    }

    if (!_.isEqual(before[key], after[key])) {
      return `  - ${key}: ${before[key]}\n  + ${key}: ${after[key]}`;
    }

    return `\n  ${key}: ${before[key]}`;
  });

  return `{${result.join('\n')}\n}`;
};
