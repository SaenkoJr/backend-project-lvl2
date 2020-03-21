import { isPlainObject } from 'lodash';

const renderValue = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const renders = {
  added: (node) => {
    const { name, newValue } = node;
    return `Property '${name}' was added with value: ${renderValue(newValue)}\n`;
  },
  removed: (node) => `Property '${node.name}' was deleted\n`,
  changed: (node) => {
    const { name, oldValue, newValue } = node;
    return `Property '${name}' was changed from ${renderValue(oldValue)} to ${renderValue(newValue)}\n`;
  },
  unchanged: (node, fn) => (node.type === 'nodesList' ? `${fn(node.children, node.name)}\n` : ''),
};

const render = (ast, path) => {
  const lines = ast.map((node) => {
    const { name, status } = node;
    const renderLine = renders[status];
    const fullname = path ? [path, name].join('.') : name;

    return renderLine({ ...node, name: fullname }, render);
  });

  return lines.flat().join('').trim();
};

export default render;
