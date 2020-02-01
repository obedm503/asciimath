import has from 'lodash/has';

export function join<T, TT>(arr: T[], separator: TT): Array<T | TT> {
  const out: Array<T | TT> = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    const item = arr[i];
    out.push(separator, item);
  }
  return out;
}

export function getFunctionName(token: string): string {
  return token.substring(0, token.indexOf('('));
}

export function combine<T, TT>(a: T[], b: TT[]): Array<T | TT> {
  const len = Math.max(a.length, b.length);
  const out: Array<T | TT> = [];
  for (let i = 0; i < len; i++) {
    if (has(a, i)) {
      out.push(a[i]);
    }
    if (has(b, i)) {
      out.push(b[i]);
    }
  }
  return out;
}
