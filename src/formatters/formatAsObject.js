import _ from 'lodash';

const renderSpace = (depth, spaces = 4, statusPad = 0) => ' '.repeat(depth * spaces - statusPad);

const stringify = (data, depth, statusPad) => {
  const lines = Object.entries(data)
    .map(([name, value]) =>
      (_.isPlainObject(value)
        ? `${renderSpace(depth + 1, 4, statusPad)}${name}: ${stringify(
          value,
          depth + 1,
          statusPad,
        )}`
        : `${renderSpace(depth + 1, 4, statusPad)}${name}: ${value}`))
    .join('\n');
  return `{\n${lines}\n${renderSpace(depth)}}`;
};

const render = (ast) => {
  const iter = (node, depth) => {
    const spaces = renderSpace(depth);
    const spacesWithStatusMark = renderSpace(depth, 4, 2);

    if (node.status === 'added') {
      if (_.isPlainObject(node.newValue)) {
        return `${spacesWithStatusMark}+ ${node.name}: ${stringify(node.newValue, depth)}`;
      }

      return `${spacesWithStatusMark}+ ${node.name}: ${node.newValue}`;
    }

    if (node.status === 'removed') {
      if (_.isPlainObject(node.oldValue)) {
        return `${spacesWithStatusMark}- ${node.name}: ${stringify(node.oldValue, depth)}`;
      }

      return `${spacesWithStatusMark}- ${node.name}: ${node.oldValue}`;
    }

    if (node.status === 'changed') {
      if (_.isPlainObject(node.oldValue)) {
        return `${spacesWithStatusMark}- ${node.name}: ${stringify(
          node.oldValue,
          depth,
        )}\n${spacesWithStatusMark}+ ${node.name}: ${node.newValue}`;
      }

      if (_.isPlainObject(node.newValue)) {
        return `${spacesWithStatusMark}- ${node.name}: ${node.oldValue}\n${spacesWithStatusMark}+ ${
          node.name
        }: ${stringify(node.newValue, depth)}`;
      }

      return [
        `${spacesWithStatusMark}- ${node.name}: ${node.oldValue}`,
        `${spacesWithStatusMark}+ ${node.name}: ${node.newValue}`,
      ].join('\n');
    }

    if (node.type === 'nodesList') {
      return `${spaces}${node.name}: {\n${node.children
        .map((n) => iter(n, depth + 1))
        .join('\n')}\n${spaces}}`;
    }

    return `${spaces}${node.name}: ${node.newValue}`;
  };

  return `{\n${ast.children.map((node) => iter(node, 1)).join('\n')}\n}`;
};

export default render;
