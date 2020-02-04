import test from 'ava';
import {
  combine,
  getFirstFunctionArgs,
  getFunctionName,
  join,
  splitAt,
} from '../src/util';

test('getFunctionName', t => {
  t.is(getFunctionName('abs($$)'), 'abs');
  t.is(getFunctionName('sqrt($$)'), 'sqrt');
  t.is(getFunctionName('root($$)'), 'root');
  t.is(getFunctionName('ceil($$)'), 'ceil');
});

test('getFunctionArgs', t => {
  t.deepEqual(
    getFirstFunctionArgs({ functionName: 'abs', arity: 1 }, '|a| abs(5) |C|'),
    { before: '|a| ', args: ['5'], after: ' |C|' },
  );
  t.deepEqual(
    getFirstFunctionArgs({ functionName: 'root', arity: 2 }, 'root(5)(4)'),
    { before: '', args: ['5', '4'], after: '' },
  );
  t.deepEqual(
    getFirstFunctionArgs({ functionName: 'abs', arity: 1 }, 'abs(x+2) abs(16)'),
    { before: '', args: ['x+2'], after: ' abs(16)' },
  );
  t.deepEqual(
    getFirstFunctionArgs(
      { functionName: 'root', arity: 2 },
      'root(8)(abs(256)) root(2)(6)   sqrt(4)',
    ),
    { before: '', args: ['8', 'abs(256)'], after: ' root(2)(6)   sqrt(4)' },
  );
  t.deepEqual(
    getFirstFunctionArgs({ functionName: 'abs', arity: 1 }, 'abs(5)'),
    { before: '', args: ['5'], after: '' },
  );
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

test('splitAt', t => {
  t.deepEqual(splitAt('clnskdlkcnsldknc', 3), ['cln', 'skdlkcnsldknc']);
  t.deepEqual(splitAt('lcskndclskndlkncsdlcns', 6), [
    'lcsknd',
    'clskndlkncsdlcns',
  ]);
  t.deepEqual(splitAt('sldknclskndc sdsdcn', 9), ['sldknclsk', 'ndc sdsdcn']);
  t.deepEqual(splitAt('sdlncsidoicnks', 8), ['sdlncsid', 'oicnks']);
});
