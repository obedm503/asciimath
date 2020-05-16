import test from './test';

test('2+2=4', '2+2=4');

test('a wedge b', 'a \\wedge{} b');

test('awedge b', 'a\\wedge{} b');

test('awedgeb', 'a\\wedge{}b');

test('9 o+ 4', '9 \\oplus{} 4');

test('a != b', 'a \\ne{} b');

test("f'(x)", "f'\\lparen{}x\\rparen{}");
