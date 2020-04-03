import fs from 'fs';
import path from 'path';

import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['pretty', 'json', 'resultObject.txt'],
  ['plain', 'yml', 'resultPlain.txt'],
  ['json', 'ini', 'resultJson.json'],
])('diff as %s (%s)', (format, ext, resultFilename) => {
  const expected = readFile(resultFilename).trim();
  const result = gendiff(
    getFixturePath(`before2.${ext}`),
    getFixturePath(`after2.${ext}`),
    format,
  );

  expect(result).toBe(expected);
});
