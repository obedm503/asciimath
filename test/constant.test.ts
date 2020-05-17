import test from './test';

test('2+2=4', '2+2=4');

test('a wedge b', 'a \\wedge{} b');

test('awedge b', 'a\\wedge{} b');

test('awedgeb', 'a\\wedge{}b');

test('9 o+ 4', '9 \\oplus{} 4');

test('a != b', 'a \\ne{} b');

test("f'(x)", "f'\\lparen{}x\\rparen{}");

test('a *** b ** c * d', 'a \\star{} b \\ast{} c \\cdot{} d');

test('a/b', '\\frac{a}{b}');

test.failing(' a/b b/c ', ' \\frac{a}{b} \\frac{b}{c} ');
test.failing('2+2 a/b  2+2', '2+2 \\frac{a}{b}  2+2');
test.failing('frac{a}{b}', '\\frac{a}{b}');
