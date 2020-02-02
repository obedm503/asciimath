import { operations } from './constants';
import { parseFunctions, parseSpaces } from './parsers';
import { AST } from './types';
import { join } from './util';

const cache: { [key: string]: AST } = {};
function parse(input: string): AST {
  if (cache[input]) {
    return cache[input];
  }
  const ast: AST = parseSpaces(input);

  // for (const op of operations.text) {
  //   for (let i = 0; i < ast.length; i++) {
  //     const chunk = ast[i];
  //     if (typeof chunk !== 'string') {
  //       // chunk has already been processed
  //       continue;
  //     }

  //     // transform
  //   }
  // }

  for (let i = 0; i < ast.length; i++) {
    const chunk = ast[i];
    if (typeof chunk !== 'string') {
      // chunk has already been processed
      continue;
    }
    const parts = parseFunctions(chunk, parse);
    ast.splice(i, 1, ...parts);
  }

  for (const op of operations.constants) {
    for (let i = 0; i < ast.length; i++) {
      const chunk = ast[i];
      if (typeof chunk !== 'string') {
        // chunk has already been processed
        continue;
      }

      const parts = join(chunk.split(op.token), op.tex);
      ast.splice(i, 1, ...parts);
    }
  }

  cache[input] = ast;
  return ast;
}

function render(ast: AST): string {
  return ast.join('');
}

export function asciimath2tex(input: string): string {
  const ast = parse(input);

  return render(ast);
}
