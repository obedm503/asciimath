import test from './test';

test('abs(x) |x|', '|x| |x|');

test('root(8)(128) sqrt(4)', '\\sqrt[8]{128} \\sqrt{4}');

test(
  'abs(x) |y| floor(x) ceil(x)',
  '|x| |y| \\lfloor{x}\\rfloor \\lceil{x}\\rceil',
);

// nested functions
test('abs(ceil(floor(x)))', '|\\lceil{\\lfloor{x}\\rfloor}\\rceil|');

// keep spaces
test(
  'abs( ceil( floor( x ) ) )',
  '| \\lceil{ \\lfloor{ x }\\rfloor }\\rceil |',
);

test('|a| |b|  |c| ', '|a| |b|  |c| ');

test('|a| abs(b)  |c| ', '|a| |b|  |c| ');
