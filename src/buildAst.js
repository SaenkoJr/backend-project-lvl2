import {
  has, union, keys, isPlainObject, get,
} from 'lodash';

const checkNodeType = (value) => (isPlainObject(value) ? 'nodesList' : 'node');

const statuses = [
  {
    status: 'unchanged',
    check: (name, config1, config2) => config1[name] === config2[name]
      || (isPlainObject(config1[name]) && isPlainObject(config2[name])),
    build: (name, oldValue, newValue, fn) => {
      const type = checkNodeType(oldValue);
      const children = type === 'nodesList' ? fn(oldValue, newValue) : [];

      return {
        type,
        name,
        oldValue,
        newValue,
        children,
      };
    },
  },
  {
    status: 'added',
    check: (name, config1) => !has(config1, name),
    build: (name, oldValue, newValue, fn) => {
      const type = checkNodeType(newValue);
      const children = type === 'nodesList' ? fn({}, newValue) : [];

      return {
        type,
        name,
        oldValue,
        newValue,
        children,
      };
    },
  },
  {
    status: 'removed',
    check: (name, config1, config2) => !has(config2, name),
    build: (name, oldValue, newValue, fn) => {
      const type = checkNodeType(oldValue);
      const children = type === 'nodesList' ? fn(oldValue, {}) : [];

      return {
        type,
        name,
        oldValue,
        newValue,
        children,
      };
    },
  },
  {
    status: 'changed',
    check: (name, config1, config2) => config1[name] !== config2[name],
    build: (name, oldValue, newValue, fn) => {
      const type = checkNodeType(newValue);
      const children = type === 'nodesList' ? fn(oldValue, newValue) : [];

      return {
        type,
        name,
        oldValue,
        newValue,
        children,
      };
    },
  },
];

const buildAst = (config1, config2) => {
  const names = union(keys(config1), keys(config2));

  return names.map((name) => {
    const oldValue = get(config1, name, null);
    const newValue = get(config2, name, null);

    const { status, build } = statuses.find(({ check }) => check(name, config1, config2));

    return {
      status,
      ...build(name, oldValue, newValue, buildAst),
    };
  });
};

export default buildAst;
