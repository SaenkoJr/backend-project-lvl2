import { isPlainObject } from 'lodash';

const renderSpace = (depth, spaces = 4, statusPad = 0) => ' '.repeat(depth * spaces - statusPad);

const stringify = (data, depth) => {
  if (isPlainObject(data)) {
    const braceSpace = renderSpace(depth);

    const lines = Object.entries(data)
      .map(([name, value]) => (isPlainObject(value)
        ? `${renderSpace(depth + 1)}${name}: ${stringify(value, depth + 1)}`
        : `${renderSpace(depth + 1)}${name}: ${value}`))
      .join('\n');

    return `{\n${lines}\n${braceSpace}}`;
  }

  return data;
};

const renders = {
  unchanged: (node, depth) => `${renderSpace(depth)}${node.name}: ${stringify(node.newValue, depth)}`,
  added: (node, depth) => `${renderSpace(depth, 4, 2)}+ ${node.name}: ${stringify(node.newValue, depth)}`,
  removed: (node, depth) => `${renderSpace(depth, 4, 2)}- ${node.name}: ${stringify(node.oldValue, depth)}`,
  changed: (node, depth) => [
    `${renderSpace(depth, 4, 2)}- ${node.name}: ${stringify(node.oldValue, depth)}`,
    `${renderSpace(depth, 4, 2)}+ ${node.name}: ${stringify(node.newValue, depth)}`,
  ].join('\n'),
  complex: (node, depth, fn) => `${renderSpace(depth)}${node.name}: ${fn(node.children, depth + 1)}`,
};

const render = (ast, depth = 1) => {
  const braceSpace = renderSpace(depth - 1);

  const lines = ast.map((node) => {
    const renderLine = renders[node.type];

    return renderLine(node, depth, render);
  });

  return `{\n${lines.join('\n')}\n${braceSpace}}`;
};

export default render;
