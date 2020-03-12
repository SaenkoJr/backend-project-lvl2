import { isPlainObject } from 'lodash';

const renderSpace = (depth, spaces = 4, statusPad = 0) => ' '.repeat(depth * spaces - statusPad);

const stringify = (data, depth) => {
  if (isPlainObject(data)) {
    const braceSpace = renderSpace(depth);

    const lines = Object.entries(data)
      .map(([name, value]) =>
        (isPlainObject(value)
          ? `${renderSpace(depth + 1, 4)}${name}: ${stringify(value, depth + 1)}`
          : `${renderSpace(depth + 1, 4)}${name}: ${value}`))
      .join('\n');

    return `{\n${lines}\n${braceSpace}}`;
  }

  return data;
};

const renders = {
  added: (node, depth) =>
    `${renderSpace(depth, 4, 2)}+ ${node.name}: ${stringify(node.newValue, depth)}`,
  removed: (node, depth) =>
    `${renderSpace(depth, 4, 2)}- ${node.name}: ${stringify(node.oldValue, depth)}`,
  changed: (node, depth) =>
    [
      `${renderSpace(depth, 4, 2)}- ${node.name}: ${stringify(node.oldValue, depth)}`,
      `${renderSpace(depth, 4, 2)}+ ${node.name}: ${stringify(node.newValue, depth)}`,
    ].join('\n'),
  unchanged: (node, depth, fn) =>
    (node.type === 'nodesList'
      ? `${renderSpace(depth)}${node.name}: ${fn(node.children, depth + 1)}`
      : `${renderSpace(depth)}${node.name}: ${stringify(node.newValue, depth)}`),
};

const render = (ast, depth = 1) => {
  const braceSpace = renderSpace(depth - 1);

  const lines = ast.map((node) => {
    const renderLine = renders[node.status];

    return renderLine(node, depth, render);
  });

  return `{\n${lines.join('\n')}\n${braceSpace}}`;
};

export default render;
