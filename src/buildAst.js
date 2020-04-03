import {
  has, union, keys, isPlainObject, get,
} from 'lodash';

const types = [
  {
    type: 'complex',
    check: (name, config1, config2) => isPlainObject(config1[name]) && isPlainObject(config2[name]),
    build: (name, oldValue, newValue, fn) => ({
      name, oldValue, newValue, children: fn(oldValue, newValue),
    }),
  },
  {
    type: 'unchanged',
    check: (name, config1, config2) => config1[name] === config2[name],
    build: (name, oldValue, newValue) => ({
      name, oldValue, newValue, children: [],
    }),
  },
  {
    type: 'added',
    check: (name, config1) => !has(config1, name),
    build: (name, oldValue, newValue) => ({
      name, oldValue, newValue, children: [],
    }),
  },
  {
    type: 'removed',
    check: (name, _config1, config2) => !has(config2, name),
    build: (name, oldValue, newValue) => ({
      name, oldValue, newValue, children: [],
    }),
  },
  {
    type: 'changed',
    check: (name, config1, config2) => config1[name] !== config2[name],
    build: (name, oldValue, newValue) => ({
      name, oldValue, newValue, children: [],
    }),
  },
];

const buildAst = (config1, config2) => {
  const names = union(keys(config1), keys(config2));

  return names.map((name) => {
    const oldValue = get(config1, name, null);
    const newValue = get(config2, name, null);

    const { type, build } = types.find(({ check }) => check(name, config1, config2));

    return {
      type,
      ...build(name, oldValue, newValue, buildAst),
    };
  });
};

export default buildAst;
