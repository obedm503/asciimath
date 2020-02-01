import { AST, FunctionOp } from './types';
import { combine } from './util';

const MATCH_ARG = /\((.*?)\)/g;
export class TexFunction {
  static parse(
    op: FunctionOp,
    input: string,
    parse: (input: string) => AST,
  ): undefined | AST {
    const matches = [...input.matchAll(op.match)];
    if (!matches.length) {
      return;
    }

    const parts = input.split(op.match);

    return combine(
      parts,
      parts.slice(1).map((s, i) => new TexFunction(op, parse, matches[i])),
    ).filter(Boolean);
  }

  private args: AST;
  constructor(
    private op: FunctionOp,
    parse: (input: string) => AST,
    match: RegExpMatchArray,
  ) {
    const argMatches = [
      ...match[0].replace(op.functionName, '').matchAll(MATCH_ARG),
    ];
    this.args = argMatches.map(argMatch => parse(argMatch[1])).flat();
  }
  toString() {
    const parts = this.op.tex.split('$$');
    return combine(parts, this.args).join('');
  }
}
