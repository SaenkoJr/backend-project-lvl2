import fs from 'fs';
import path from 'path';

import gendiff from '../src';

const formats = ['json', 'yml'];
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe.each(formats)('diff between %s', (format) => {
  test('comparing two files', () => {
    const expected = readFile('result.txt').trim();

    expect(gendiff(
      getFixturePath(`before.${format}`),
      getFixturePath(`after.${format}`),
    )).toBe(expected);
  });
});
