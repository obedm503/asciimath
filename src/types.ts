export type AST = Array<string | Object>;

export enum SymbolType {
  text, // has no arguments, leave in place
  constant, // has no arguments, is simply replaced in place with added backslashes
  function, // takes arguments.begins with a name. has parentheses
  infix, // like function, but with no name or parentheses
}

export type ConstantOp = {
  readonly token: string;
  readonly tex: { toString(): string };
  readonly type: SymbolType.constant;
};
export type TextOp = {
  readonly token: string;
  readonly tex: string;
  readonly type: SymbolType.text;
};
export type FunctionOp = {
  readonly type: SymbolType.function;
  readonly tex: string;
  readonly token: string;
  readonly match: RegExp;
  readonly functionName: string;
  readonly arity: number; // number of function arguments
};
export type InfixOp = {
  readonly type: SymbolType.infix;
  readonly tex: string;
  readonly token: string;
  readonly match: RegExp;
};
export type Operation = ConstantOp | TextOp | FunctionOp | InfixOp;

export type Parse = (input: string) => AST;
