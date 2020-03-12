import {
  has, union, keys, isPlainObject, get,
} from 'lodash';

const checkNodeType = (value) => (isPlainObject(value) ? 'nodesList' : 'node');

const statuses = [
  {
    status: 'unchanged',
    check: (name, config1, config2) =>
      config1[name] === config2[name]
      || (isPlainObject(config1[name]) && isPlainObject(config2[name])),
    getType: (oldValue) => checkNodeType(oldValue),
    process: (value1, value2, fn) => fn(value1, value2),
  },
  {
    status: 'added',
    check: (name, config1) => !has(config1, name),
    getType: (oldValue, newValue) => checkNodeType(newValue),
    process: (value1, value2, fn) => fn({}, value2),
  },
  {
    status: 'removed',
    check: (name, config1, config2) => !has(config2, name),
    getType: (oldValue) => checkNodeType(oldValue),
    process: (value1, value2, fn) => fn(value1, {}),
  },
  {
    status: 'changed',
    check: (name, config1, config2) => config1[name] !== config2[name],
    getType: (oldValue, newValue) => checkNodeType(newValue),
    process: (value1, value2, fn) => fn(value1, value2),
  },
];

const getNodeStatus = (name, config1, config2) =>
  statuses.find(({ check }) => check(name, config1, config2));

const buildAst = (config1, config2) => {
  const names = union(keys(config1), keys(config2));

  return names.map((name) => {
    const oldValue = get(config1, name, null);
    const newValue = get(config2, name, null);

    // const { type, process } = getNodeType(oldValue, newValue);
    const { status, getType, process } = getNodeStatus(name, config1, config2);
    const type = getType(oldValue, newValue);
    const children = type === 'nodesList' ? process(oldValue, newValue, buildAst) : [];

    return {
      type,
      name,
      status,
      oldValue,
      newValue,
      children,
    };
  });
};

export default buildAst;
