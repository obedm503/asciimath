import test from 'ava';
import { asciimath2tex } from './index';

test('2+2=4', t => {
  t.is(asciimath2tex('2+2=4'), '2+2=4');
});
