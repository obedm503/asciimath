import has from 'lodash-es/has';
import range from 'lodash-es/range';
import { FunctionOp } from './types';

export function join<T, TT>(arr: T[], separator: TT): Array<T | TT> {
  const out: Array<T | TT> = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    const item = arr[i];
    out.push(separator, item);
  }
  return out;
}

export function getFunctionName(token: string): string {
  return token.substring(0, token.indexOf('('));
}
export function getFirstFunctionArgs(
  op: Pick<FunctionOp, 'functionName' | 'arity'>,
  input: string,
): { args: string[]; before: string; after: string } {
  const args: string[] = [];
  const funNameIndex = input.indexOf(op.functionName);
  const before = input.substring(0, funNameIndex);
  // remove function name
  let chunk = input.substring(funNameIndex + op.functionName.length);

  range(op.arity).forEach(() => {
    chunk = chunk.substring(1); // remove first parenthesis
    let parenCount = 0;

    for (let i = 0; i < chunk.length; i++) {
      const char = chunk[i];
      if (char === '(') {
        parenCount--;
      } else if (char === ')') {
        parenCount++;
      }

      if (parenCount === 1) {
        // found second parethesis

        // arg is 0 until second parenthesis
        const arg = chunk.substring(0, i);
        args.push(arg);

        // remove arg plus second parenthesis
        chunk = chunk.substring(i + 1);

        break;
      }
    }
  });

  return { before, args, after: chunk };
}

export function combine<T, TT>(a: T[], b: TT[]): Array<T | TT> {
  const len = Math.max(a.length, b.length);
  const out: Array<T | TT> = [];
  for (let i = 0; i < len; i++) {
    if (has(a, i)) {
      out.push(a[i]);
    }
    if (has(b, i)) {
      out.push(b[i]);
    }
  }
  return out;
}
