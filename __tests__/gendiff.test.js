import fs from 'fs';
import path from 'path';

import buildAst from '../src/buildAst';
import gendiff from '../src';

const formats = ['json', 'yml', 'ini'];
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('build ast', () => {
  const before = {
    common: {
      setting1: 'Value 1',
      setting6: {
        key: 'value',
      },
    },
    group1: {
      baz: 'bas',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
    },
  };
  const after = {
    common: {
      follow: false,
      setting1: 'Value 2',
      setting3: {
        key: 'value',
      },
      setting6: {
        key: 'value',
        ops: 'vops',
      },
    },
    group1: {
      foo: 'bar',
      baz: 'bars',
      nest: 'str',
    },
    group3: {
      fee: 100500,
    },
  };

  const expected = [
    {
      type: 'nodesList',
      name: 'common',
      status: 'unchanged',
      oldValue: {
        setting1: 'Value 1',
        setting6: {
          key: 'value',
        },
      },
      newValue: {
        follow: false,
        setting1: 'Value 2',
        setting3: {
          key: 'value',
        },
        setting6: {
          key: 'value',
          ops: 'vops',
        },
      },
      children: [
        {
          type: 'node',
          name: 'setting1',
          status: 'changed',
          oldValue: 'Value 1',
          newValue: 'Value 2',
          children: [],
        },
        {
          type: 'nodesList',
          name: 'setting6',
          status: 'unchanged',
          oldValue: {
            key: 'value',
          },
          newValue: {
            key: 'value',
            ops: 'vops',
          },
          children: [
            {
              type: 'node',
              name: 'key',
              status: 'unchanged',
              oldValue: 'value',
              newValue: 'value',
              children: [],
            },
            {
              type: 'node',
              name: 'ops',
              status: 'added',
              oldValue: null,
              newValue: 'vops',
              children: [],
            },
          ],
        },
        {
          type: 'node',
          name: 'follow',
          status: 'added',
          oldValue: null,
          newValue: false,
          children: [],
        },
        {
          type: 'nodesList',
          name: 'setting3',
          status: 'added',
          oldValue: null,
          newValue: { key: 'value' },
          children: [
            {
              type: 'node',
              name: 'key',
              status: 'added',
              oldValue: null,
              newValue: 'value',
              children: [],
            },
          ],
        },
      ],
    },
    {
      type: 'nodesList',
      name: 'group1',
      status: 'unchanged',
      oldValue: {
        baz: 'bas',
        nest: {
          key: 'value',
        },
      },
      newValue: {
        foo: 'bar',
        baz: 'bars',
        nest: 'str',
      },
      children: [
        {
          type: 'node',
          name: 'baz',
          status: 'changed',
          oldValue: 'bas',
          newValue: 'bars',
          children: [],
        },
        {
          type: 'node',
          name: 'nest',
          status: 'changed',
          oldValue: { key: 'value' },
          newValue: 'str',
          children: [],
        },
        {
          type: 'node',
          name: 'foo',
          status: 'added',
          oldValue: null,
          newValue: 'bar',
          children: [],
        },
      ],
    },
    {
      type: 'nodesList',
      name: 'group2',
      status: 'removed',
      oldValue: {
        abc: 12345,
      },
      newValue: null,
      children: [
        {
          type: 'node',
          name: 'abc',
          status: 'removed',
          oldValue: 12345,
          newValue: null,
          children: [],
        },
      ],
    },
    {
      type: 'nodesList',
      name: 'group3',
      status: 'added',
      oldValue: null,
      newValue: {
        fee: 100500,
      },
      children: [
        {
          type: 'node',
          name: 'fee',
          status: 'added',
          oldValue: null,
          newValue: 100500,
          children: [],
        },
      ],
    },
  ];

  const result = buildAst(before, after);
  // console.log('ast', JSON.stringify(result, null, 2));

  expect(result).toEqual(expected);
});

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
