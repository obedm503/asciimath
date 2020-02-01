import test from './test';

test('abs(x) |x|', '|x| |x|');

test('root(8)(128) sqrt(4)', '\\sqrt[8]{128} \\sqrt{4}');

test(
  'abs(x) |x| floor(x) ceil(x)',
  '|x| |x| \\lfloor{x}\\rfloor \\lceil{x}\\rceil',
);

test.failing('abs(ceil(floor(x)))', '|\\lceil{\\lfloor{x}\\rfloor}\\rceil|');
