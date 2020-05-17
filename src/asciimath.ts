import { operations } from './constants';
import { parseFunctions, parseSpaces } from './parsers';
import { AST } from './types';
import { combine, join } from './util';

const cache: { [key: string]: AST } = {};
function parse(input: string): AST {
  if (cache[input]) {
    return cache[input];
  }
  const ast: AST = parseSpaces(input);

  for (const op of operations.infix) {
    for (let i = 0; i < ast.length; i++) {
      const chunk = ast[i];
      if (typeof chunk !== 'string') {
        // chunk has already been processed
        continue;
      }

      // transform
      if (chunk.match(op.match)) {
        const infix = op.token.split('$$')[1];
        const infixIndex = chunk.indexOf(infix);
        const first = chunk.substring(0, infixIndex);
        const rest = chunk.substring(infixIndex + 1);
        let endIndex = rest.indexOf(' ');
        if (endIndex < 0) {
          endIndex = rest.length;
        }
        const second = rest.substring(0, endIndex);
        ast.splice(
          i,
          1,
          {
            toString() {
              const parts = op.tex.split('$$');
              return combine(parts, [first, second]).join('');
            },
          },
          rest.substring(endIndex + 1),
        );
      }
    }
  }

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

export function asciimath(input: string): string {
  const ast = parse(input);

  return render(ast);
}
