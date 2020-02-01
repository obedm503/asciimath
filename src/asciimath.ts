import { operations } from './constants';
import { TexFunction } from './parsers';
import { AST } from './types';
import { join } from './util';

function parse(input: string): AST {
  const ast: AST = [input];

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

  for (const op of operations.functions) {
    for (let i = 0; i < ast.length; i++) {
      const chunk = ast[i];
      if (typeof chunk !== 'string') {
        // chunk has already been processed
        continue;
      }

      const parts = TexFunction.parse(op, chunk, parse);
      if (!parts) {
        continue;
      }

      ast.splice(i, 1, ...parts);
    }
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

  return ast;
}

function render(ast: AST): string {
  return ast.join('');
}

export function asciimath2tex(input: string): string {
  const ast = parse(input);

  return render(ast);
}
