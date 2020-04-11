import { isPlainObject, isNull } from 'lodash';

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
  added: ({ name, value }) => `Property '${name}' was added with value: ${stringify(value)}`,
  removed: ({ name }) => `Property '${name}' was deleted`,
  changed: ({ name, oldValue, newValue }) => (
    `Property '${name}' was changed from ${stringify(oldValue)} to ${stringify(newValue)}`
  ),
  complex: (node, fn) => fn(node.children, node.name),
  unchanged: () => null,
};

const render = (ast, path) => {
  const lines = ast.map((node) => {
    const { name, type } = node;
    const renderLine = renders[type];
    const fullpath = path ? [path, name].join('.') : name;

    return renderLine({ ...node, name: fullpath }, render);
  });

  return lines
    .filter((line) => !isNull(line))
    .join('\n')
    .trim();
};

export default render;
