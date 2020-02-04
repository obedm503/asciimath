import ava, { Implementation } from 'ava';
import { renderToString } from 'katex';
import asciimath from '../src/asciimath';

const macro = (input: string, expected: string): Implementation => t => {
  const output = asciimath(input);

  // checks output
  t.is(output, expected);

  // checks that output is valid
  t.notThrows(() => {
    try {
      renderToString(output, { throwOnError: true });
    } catch {
      throw new Error('KaTeX: invalid syntax');
    }
  });
};

export default function test(input: string, expected: string) {
  ava(input, macro(input, expected));
}
test.only = function(input: string, expected: string) {
  ava.only(input, macro(input, expected));
};
test.failing = function(input: string, expected: string) {
  ava.failing(input, macro(input, expected));
};
