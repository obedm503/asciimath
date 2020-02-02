import { operations } from './constants';
import { Space, TexFunction } from './nodes';
import { AST, Parse } from './types';
import { getFirstFunctionArgs } from './util';

export function parseFunctions(input: string, parse: Parse): AST {
  if (input.length === 0) {
    return [];
  }

  const MATCH_FUNC = /(\w+)\(/; // matches "name(", functions

  const result = MATCH_FUNC.exec(input);

  if (!result) {
    return [input];
  }

  const funcName = result[1];
  const op = operations.functions[funcName];
  if (!op) {
    throw new Error(`unknown function ${funcName}`);
  }

  const ast: AST = [];

  const { before: pre, args, after: rest } = getFirstFunctionArgs(op, input);
  {
    const [before, trimmed, after] = parseSpaces(pre);
    if (before.length !== 0) {
      ast.push(before);
    }
    ast.push(...parseFunctions(trimmed, parse));
    if (after.length !== 0) {
      ast.push(after);
    }
  }

  const parsedArgs = args.map(s => parse(s));
  const fun = new TexFunction(op, parsedArgs);
  ast.push(fun);

  {
    const [before, trimmed, after] = parseSpaces(rest);
    if (before.length !== 0) {
      ast.push(before);
    }
    ast.push(...parseFunctions(trimmed, parse));
    if (after.length !== 0) {
      ast.push(after);
    }
  }

  return ast;
}

export function parseSpaces(input: string): [Space, string, Space] {
  if (input.length === 0) {
    return [new Space(0), input, new Space(0)];
  }

  let startSpaces = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === ' ') {
      startSpaces++;
    } else {
      break;
    }
  }

  let endSpaces = 0;
  let len = input.length;
  while (len--) {
    const char = input[len];
    if (char === ' ') {
      endSpaces++;
    } else {
      break;
    }
  }

  return [new Space(startSpaces), input.trim(), new Space(endSpaces)];
}
