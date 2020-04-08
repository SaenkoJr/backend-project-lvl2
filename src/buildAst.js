import {
  has, union, keys, isPlainObject, get,
} from 'lodash';

const types = [
  {
    type: 'complex',
    check: (name, config1, config2) => isPlainObject(config1[name]) && isPlainObject(config2[name]),
    build: (name, config1, config2, fn) => ({
      name, children: fn(config1, config2),
    }),
  },
  {
    type: 'unchanged',
    check: (name, config1, config2) => config1[name] === config2[name],
    build: (name, value) => ({
      name, value,
    }),
  },
  {
    type: 'added',
    check: (name, config1) => !has(config1, name),
    build: (name, _value1, value2) => ({
      name, value: value2,
    }),
  },
  {
    type: 'removed',
    check: (name, _config1, config2) => !has(config2, name),
    build: (name, value) => ({
      name, value,
    }),
  },
  {
    type: 'changed',
    check: (name, config1, config2) => config1[name] !== config2[name],
    build: (name, oldValue, newValue) => ({
      name, oldValue, newValue,
    }),
  },
];

const buildAst = (config1, config2) => {
  const names = union(keys(config1), keys(config2));

  return names.map((name) => {
    const value1 = get(config1, name, null);
    const value2 = get(config2, name, null);

    const { type, build } = types.find(({ check }) => check(name, config1, config2));

    return {
      type,
      ...build(name, value1, value2, buildAst),
    };
  });
};

export default buildAst;
