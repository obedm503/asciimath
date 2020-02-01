import test from 'ava';
import { getFunctionName, join, combine } from '../src/util';

test('getFunctionName', t => {
  t.is(getFunctionName('abs($$)'), 'abs');
  t.is(getFunctionName('sqrt($$)'), 'sqrt');
  t.is(getFunctionName('root($$)'), 'root');
  t.is(getFunctionName('ceil($$)'), 'ceil');
});

test('join', t => {
  t.deepEqual(join([1, 2, 3, 4], '$'), [1, '$', 2, '$', 3, '$', 4]);

  const separator = {};
  t.deepEqual(join([1, 2, 3, 4], separator), [
    1,
    separator,
    2,
    separator,
    3,
    separator,
    4,
  ]);
});

test('combine', t => {
  t.deepEqual(combine([1, 2, 3, 4], ['a', 'b', 'c', 'd']), [
    1,
    'a',
    2,
    'b',
    3,
    'c',
    4,
    'd',
  ]);
});
