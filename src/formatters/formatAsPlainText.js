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
  added: (name, oldValue, newValue) =>
    `Property '${name}' was added with value: ${renderValue(newValue)}\n`,
  removed: (name) => `Property '${name}' was deleted\n`,
  changed: (name, oldValue, newValue) =>
    `Property '${name}' was changed from ${renderValue(oldValue)} to ${renderValue(newValue)}\n`,
  unchanged: (name, oldValue, newValue, meta, fn) =>
    (meta.type === 'nodesList' ? `${fn(meta.children, name)}\n` : ''),
};

const render = (ast, path) => {
  const lines = ast.map((node) => {
    const {
      name,
      oldValue,
      newValue,
      status,
      children,
      type,
    } = node;
    const renderLine = renders[status];
    const fullname = path ? [path, name].join('.') : name;
    const meta = { children, type };

    return renderLine(fullname, oldValue, newValue, meta, render);
  });

  return lines
    .flat()
    .join('')
    .trim();
};

export default render;
