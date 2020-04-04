import { isPlainObject, noop } from 'lodash';

const stringify = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const renders = {
  added: ({ name, newValue }) => `Property '${name}' was added with value: ${stringify(newValue)}\n`,
  removed: ({ name }) => `Property '${name}' was deleted\n`,
  changed: ({ name, oldValue, newValue }) => (
    `Property '${name}' was changed from ${stringify(oldValue)} to ${stringify(newValue)}\n`
  ),
  complex: (node, fn) => `${fn(node.children, node.name)}\n`,
  unchanged: noop,
};

const render = (ast, path) => {
  const lines = ast.map((node) => {
    const { name, type } = node;
    const renderLine = renders[type];
    const fullpath = path ? [path, name].join('.') : name;

    return renderLine({ ...node, name: fullpath }, render);
  });

  return lines.flat().join('').trim();
};

export default render;
