import _ from 'lodash';

const renderValue = (value) => {
  if (_.isPlainObject(value)) {
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
};

const render = (ast) => {
  const iter = (node, path) => {
    const fullPath = path ? `${path}.${node.name}` : node.name;

    if (node.status === 'unchanged') {
      return node.children
        .map((child) => iter(child, fullPath))
        .flat()
        .join('');
    }

    return renders[node.status](fullPath, node.oldValue, node.newValue);
  };

  return ast.children
    .map((child) => iter(child))
    .flat()
    .join('')
    .trim();
};

export default render;
