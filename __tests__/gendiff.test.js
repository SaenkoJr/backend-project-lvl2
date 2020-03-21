import fs from 'fs';
import path from 'path';

import gendiff from '../src';

const formats = ['json', 'yml', 'ini'];
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each(formats)('diff as object (%s)', (format) => {
  const expected = readFile('resultObject.txt').trim();
  const result = gendiff(
    getFixturePath(`before2.${format}`),
    getFixturePath(`after2.${format}`),
    'object',
  );

  expect(result).toBe(expected);
});

test.each(formats)('diff as plain text (%s)', (format) => {
  const expected = readFile('resultPlain.txt').trim();
  const result = gendiff(
    getFixturePath(`before2.${format}`),
    getFixturePath(`after2.${format}`),
    'plain',
  );

  expect(result).toBe(expected);
});

test.each(formats)('diff as json (%s)', (format) => {
  const expected = readFile('resultJson.json').trim();
  const result = gendiff(
    getFixturePath(`before2.${format}`),
    getFixturePath(`after2.${format}`),
    'json',
  );

  expect(result).toEqual(expected);
});
