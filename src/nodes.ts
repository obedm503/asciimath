import { FunctionOp, AST } from './types';
import { combine } from './util';

export class TexFunction {
  constructor(private op: FunctionOp, private args: AST[]) {}
  toString() {
    const parts = this.op.tex.split('$$');
    return combine(parts, this.args)
      .flat()
      .join('');
  }
}

export class Space {
  constructor(public readonly length: number) {}
  toString() {
    if (this.length === 0) {
      return '';
    }
    let s = '';
    let n = this.length;
    while (n--) {
      s += ' ';
    }
    return s;
  }
}
