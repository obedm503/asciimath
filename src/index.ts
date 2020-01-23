import { symbols } from './constants';

type AST = any;
function parse(input: string): AST {}

function render(input: AST): string {
  return '';
}

export function asciimath2tex(input: string): string {
  return render(parse(input));
}
