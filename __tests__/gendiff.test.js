import fs from 'fs';
import path from 'path';

import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff test', () => {
  test('compare two epmty objects', () => {
    expect(gendiff(
      getFixturePath('empty.json'),
      getFixturePath('empty.json'),
    )).toEqual('');
  });

  test('comparing two different objects', () => {
    const result = readFile('result.txt').trim();

    expect(gendiff(
      getFixturePath('before.json'),
      getFixturePath('after.json'),
    )).toBe(result);
  });
});
