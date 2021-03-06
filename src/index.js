import fs from 'fs';
import path from 'path';

import buildAst from './buildAst';
import render from './formatters';
import getParser from './parsers';

export default (filepath1, filepath2, format) => {
  const ext = path.extname(filepath1).slice(1);
  const parse = getParser(ext);

  const before = parse(fs.readFileSync(filepath1, 'utf-8'));
  const after = parse(fs.readFileSync(filepath2, 'utf-8'));

  const ast = buildAst(before, after);

  return render(ast, format);
};
