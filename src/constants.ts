import keyBy from 'lodash/keyBy';
import orderBy from 'lodash/orderBy';
import {
  ConstantOp,
  FunctionOp,
  InfixOp,
  Operation,
  SymbolType,
  TextOp,
} from './types';
import { getFunctionName } from './util';

export type Token = {
  tokens: readonly string[];
  readonly tex: string;
  readonly type: SymbolType;
};

export const symbols: readonly Token[] = [
  // Operation symbols
  { tokens: ['+'], tex: '+', type: SymbolType.text },
  { tokens: ['int'], tex: 'int', type: SymbolType.constant },
  { tokens: ['*', 'cdot'], tex: 'cdot', type: SymbolType.constant },
  { tokens: ['**', 'ast'], tex: 'ast', type: SymbolType.constant },
  { tokens: ['***', 'star'], tex: 'star', type: SymbolType.constant },
  { tokens: ['//'], tex: '/', type: SymbolType.text },
  {
    tokens: ['\\\\', 'backslash', 'setminus'],
    tex: 'backslash',
    type: SymbolType.constant,
  },
  { tokens: ['xx', 'times'], tex: 'times', type: SymbolType.constant },
  { tokens: ['-:', 'div'], tex: 'div', type: SymbolType.constant },
  { tokens: ['|><', 'ltimes'], tex: 'ltimes', type: SymbolType.constant },
  { tokens: ['><|', 'rtimes'], tex: 'rtimes', type: SymbolType.constant },
  { tokens: ['|><|', 'bowtie'], tex: 'bowtie', type: SymbolType.constant },
  { tokens: ['@', 'circ'], tex: 'circ', type: SymbolType.constant },
  { tokens: ['o+', 'oplus'], tex: 'oplus', type: SymbolType.constant },
  { tokens: ['ox', 'otimes'], tex: 'otimes', type: SymbolType.constant },
  { tokens: ['o.', 'odot'], tex: 'odot', type: SymbolType.constant },
  { tokens: ['sum'], tex: 'sum', type: SymbolType.constant },
  { tokens: ['prod'], tex: 'prod', type: SymbolType.constant },
  { tokens: ['^^', 'wedge'], tex: 'wedge', type: SymbolType.constant },
  { tokens: ['^^^', 'bigwedge'], tex: 'bigwedge', type: SymbolType.constant },
  { tokens: ['vv', 'vee'], tex: 'vee', type: SymbolType.constant },
  { tokens: ['vvv', 'bigvee'], tex: 'bigvee', type: SymbolType.constant },
  { tokens: ['nn', 'cap'], tex: 'cap', type: SymbolType.constant },
  { tokens: ['nnn', 'bigcap'], tex: 'bigcap', type: SymbolType.constant },
  { tokens: ['uu', 'cup'], tex: 'cup', type: SymbolType.constant },
  { tokens: ['uuu', 'bigcup'], tex: 'bigcup', type: SymbolType.constant },

  // Miscellaneous symbols
  {
    tokens: ['$$/$$', 'frac{$$}{$$}'],
    tex: '\\frac{$$}{$$}',
    type: SymbolType.infix,
  },
  { tokens: ['$$^$$'], tex: '$$^$$', type: SymbolType.infix },
  { tokens: ['sqrt($$)'], tex: '\\sqrt{$$}', type: SymbolType.function },
  {
    tokens: ['root($$)($$)'],
    tex: '\\sqrt[$$]{$$}',
    type: SymbolType.function,
  },
  { tokens: ['int'], tex: 'int', type: SymbolType.constant },
  { tokens: ['oint'], tex: 'oint', type: SymbolType.constant },
  { tokens: ['del', 'partial'], tex: 'partial', type: SymbolType.constant },
  { tokens: ['grad', 'nabla'], tex: 'nabla', type: SymbolType.constant },
  { tokens: ['+-', 'pm'], tex: 'pm', type: SymbolType.constant },
  { tokens: ['O/', 'emptyset'], tex: 'emptyset', type: SymbolType.constant },
  { tokens: ['oo', 'infty'], tex: 'infty', type: SymbolType.constant },
  { tokens: ['aleph'], tex: 'aleph', type: SymbolType.constant },
  { tokens: [':.', 'therefore'], tex: 'therefore', type: SymbolType.constant },
  { tokens: [":'", 'because'], tex: 'because', type: SymbolType.constant },
  { tokens: ['...', 'ldots'], tex: 'ldots', type: SymbolType.constant },
  { tokens: ['cdots'], tex: 'cdots', type: SymbolType.constant },
  { tokens: ['vdots'], tex: 'vdots', type: SymbolType.constant },
  { tokens: ['ddots'], tex: 'ddots', type: SymbolType.constant },
  // { tokens: ['| |'], tex: '' },
  { tokens: ['quad'], tex: 'quad', type: SymbolType.constant },
  { tokens: ['qquad'], tex: 'qquad', type: SymbolType.constant },
  { tokens: ['/_', 'angle'], tex: 'angle', type: SymbolType.constant },
  { tokens: ['frown'], tex: 'frown', type: SymbolType.constant },
  { tokens: ['/_\\', 'triangle'], tex: 'triangle', type: SymbolType.constant },
  { tokens: ['diamond'], tex: 'diamond', type: SymbolType.constant },
  { tokens: ['square'], tex: 'square', type: SymbolType.constant },
  { tokens: ['|__', 'lfloor'], tex: 'lfloor', type: SymbolType.constant },
  { tokens: ['__|', 'rfloor'], tex: 'rfloor', type: SymbolType.constant },
  { tokens: ['|~', 'lceiling'], tex: 'lceil', type: SymbolType.constant },
  { tokens: ['~|', 'rceiling'], tex: 'rceil', type: SymbolType.constant },
  { tokens: ['CC'], tex: 'mathbb{C}', type: SymbolType.constant },
  { tokens: ['NN'], tex: 'mathbb{N}', type: SymbolType.constant },
  { tokens: ['QQ'], tex: 'mathbb{Q}', type: SymbolType.constant },
  { tokens: ['RR'], tex: 'mathbb{R}', type: SymbolType.constant },
  { tokens: ['ZZ'], tex: 'mathbb{Z}', type: SymbolType.constant },
  // { tokens: ['"hi"', 'text(hi)'], tex: '' },

  // Relation symbols
  { tokens: ['='], tex: '=', type: SymbolType.text },
  { tokens: ['!=', 'ne'], tex: 'ne', type: SymbolType.constant },
  { tokens: ['<', 'lt'], tex: 'le', type: SymbolType.constant },
  { tokens: ['>', 'gt'], tex: 'gt', type: SymbolType.constant },
  { tokens: ['<=', 'le'], tex: 'le', type: SymbolType.constant },
  { tokens: ['>=', 'ge'], tex: 'ge', type: SymbolType.constant },
  { tokens: ['-<', 'prec'], tex: 'prec', type: SymbolType.constant },
  { tokens: ['-<=', 'preceq'], tex: 'preceq', type: SymbolType.constant },
  { tokens: ['>-', 'succ'], tex: 'succ', type: SymbolType.constant },
  { tokens: ['>-=', 'succeq'], tex: 'succeq', type: SymbolType.constant },
  { tokens: ['in'], tex: 'in', type: SymbolType.constant },
  { tokens: ['!in', 'notin'], tex: 'notin', type: SymbolType.constant },
  { tokens: ['sub', 'subset'], tex: 'subset', type: SymbolType.constant },
  { tokens: ['sup', 'supset'], tex: 'supset', type: SymbolType.constant },
  { tokens: ['sube', 'subseteq'], tex: 'subseteq', type: SymbolType.constant },
  { tokens: ['supe', 'supseteq'], tex: 'supseteq', type: SymbolType.constant },
  { tokens: ['-=', 'equiv'], tex: 'equiv', type: SymbolType.constant },
  { tokens: ['~=', 'cong'], tex: 'cong', type: SymbolType.constant },
  { tokens: ['~~', 'approx'], tex: 'approx', type: SymbolType.constant },
  { tokens: ['prop', 'propto'], tex: 'propto', type: SymbolType.constant },

  // Logical symbols
  { tokens: ['and'], tex: 'and', type: SymbolType.text },
  { tokens: ['or'], tex: 'or', type: SymbolType.text },
  { tokens: ['not', 'neg'], tex: 'neg', type: SymbolType.constant },
  { tokens: ['=>', 'implies'], tex: 'implies', type: SymbolType.constant },
  { tokens: ['if'], tex: 'if', type: SymbolType.text },
  { tokens: ['<=>', 'iff'], tex: 'iff', type: SymbolType.constant },
  { tokens: ['AA', 'forall'], tex: 'forall', type: SymbolType.constant },
  { tokens: ['EE', 'exists'], tex: 'exists', type: SymbolType.constant },
  { tokens: ['_|_', 'bot'], tex: 'bot', type: SymbolType.constant },
  { tokens: ['TT', 'top'], tex: 'top', type: SymbolType.constant },
  { tokens: ['|--', 'vdash'], tex: 'vdash', type: SymbolType.constant },
  { tokens: ['|==', 'models'], tex: 'model', type: SymbolType.constant },

  // Grouping brackets
  { tokens: ['('], tex: 'lparen', type: SymbolType.constant },
  { tokens: [')'], tex: 'rparen', type: SymbolType.constant },
  { tokens: ['['], tex: 'lbrack', type: SymbolType.constant },
  { tokens: [']'], tex: 'rbrack', type: SymbolType.constant },
  { tokens: ['{'], tex: 'lbrace', type: SymbolType.constant },
  { tokens: ['}'], tex: 'rbrace', type: SymbolType.constant },
  { tokens: ['<<', '(:'], tex: 'langle', type: SymbolType.constant },
  { tokens: ['>>', ':)'], tex: 'rangle', type: SymbolType.constant },
  { tokens: ['{: $$ )'], tex: '', type: SymbolType.infix },
  { tokens: ['( $$ :}'], tex: '', type: SymbolType.infix },
  { tokens: ['abs($$)'], tex: '|$$|', type: SymbolType.function },
  {
    tokens: ['floor($$)'],
    tex: '\\lfloor{$$}\\rfloor',
    type: SymbolType.function,
  },
  {
    tokens: ['ceil($$)'],
    tex: '\\lceil{$$}\\rceil',
    type: SymbolType.function,
  },
  { tokens: ['norm($$)'], tex: '\\|$$\\|', type: SymbolType.function },

  // Arrows
  { tokens: ['uarr', 'uparrow'], tex: 'uparrow', type: SymbolType.constant },
  {
    tokens: ['darr', 'downarrow'],
    tex: 'downarrow',
    type: SymbolType.constant,
  },
  {
    tokens: ['rarr', 'rightarrow'],
    tex: 'rightarrow',
    type: SymbolType.constant,
  },
  { tokens: ['->', 'to'], tex: 'to', type: SymbolType.constant },
  {
    tokens: ['>->', 'rightarrowtail'],
    tex: 'rightarrowtail',
    type: SymbolType.constant,
  },
  {
    tokens: ['->>', 'twoheadrightarrow'],
    tex: 'twoheadrightarrow',
    type: SymbolType.constant,
  },
  {
    tokens: ['>->>', 'twoheadrightarrowtail'],
    tex: 'twoheadrightarrowtail',
    type: SymbolType.constant,
  },
  { tokens: ['|->', 'mapsto'], tex: 'mapsto', type: SymbolType.constant },
  {
    tokens: ['larr', 'leftarrow'],
    tex: 'leftarrow',
    type: SymbolType.constant,
  },
  {
    tokens: ['harr', 'leftrightarrow'],
    tex: 'leftrightarrow',
    type: SymbolType.constant,
  },
  {
    tokens: ['rArr', 'Rightarrow'],
    tex: 'Rightarrow',
    type: SymbolType.constant,
  },
  {
    tokens: ['lArr', 'Leftarrow'],
    tex: 'Leftarrow',
    type: SymbolType.constant,
  },
  {
    tokens: ['hArr', 'Leftrightarrow'],
    tex: 'Leftrightarrow',
    type: SymbolType.constant,
  },

  // Accents
  { tokens: ['hat($$)'], tex: '\\hat{$$}', type: SymbolType.function },
  {
    tokens: ['bar($$)', 'overline($$)'],
    tex: '\\overline{$$}',
    type: SymbolType.function,
  },
  {
    tokens: ['ul($$)', 'underline($$)'],
    tex: '\\underline{$$}',
    type: SymbolType.function,
  },
  { tokens: ['vec($$)'], tex: '\\vec{$$}', type: SymbolType.function },
  { tokens: ['dot($$)'], tex: '\\dot{$$}', type: SymbolType.function },
  { tokens: ['ddot($$)'], tex: '\\ddot{$$}', type: SymbolType.function },
  {
    tokens: ['overset($$)($$)'],
    tex: '\\overset{$$}{$$}',
    type: SymbolType.function,
  },
  {
    tokens: ['underset($$)($$)'],
    tex: '\\underset{$$}{$$}',
    type: SymbolType.function,
  },
  {
    tokens: ['ubrace($$)', 'underbrace($$)'],
    tex: '\\underbrace{$$}',
    type: SymbolType.function,
  },
  {
    tokens: ['obrace($$)', 'overbrace($$)'],
    tex: '\\overbrace{$$}',
    type: SymbolType.function,
  },
  {
    tokens: ['color($$)($$)'],
    tex: '\\color{$$}{$$}',
    type: SymbolType.function,
  },
  { tokens: ['cancel($$)'], tex: '\\cancel{$$}', type: SymbolType.function },

  // Greek Letters
  { tokens: ['alpha'], tex: 'alpha', type: SymbolType.constant },
  { tokens: ['beta'], tex: 'beta', type: SymbolType.constant },
  { tokens: ['gamma'], tex: 'gamma', type: SymbolType.constant },
  { tokens: ['Gamma'], tex: 'Gamma', type: SymbolType.constant },
  { tokens: ['delta'], tex: 'delta', type: SymbolType.constant },
  { tokens: ['Delta'], tex: 'Delta', type: SymbolType.constant },
  { tokens: ['epsilon'], tex: 'epsilon', type: SymbolType.constant },
  { tokens: ['varepsilon'], tex: 'varepsilon', type: SymbolType.constant },
  { tokens: ['zeta'], tex: 'zeta', type: SymbolType.constant },
  { tokens: ['eta'], tex: 'eta', type: SymbolType.constant },
  { tokens: ['theta'], tex: 'theta', type: SymbolType.constant },
  { tokens: ['Theta'], tex: 'Theta', type: SymbolType.constant },
  { tokens: ['vartheta'], tex: 'vartheta', type: SymbolType.constant },
  { tokens: ['iota'], tex: 'iota', type: SymbolType.constant },
  { tokens: ['kappa'], tex: 'kappa', type: SymbolType.constant },
  { tokens: ['lambda'], tex: 'lambda', type: SymbolType.constant },
  { tokens: ['Lambda'], tex: 'Lambda', type: SymbolType.constant },
  { tokens: ['mu'], tex: 'mu', type: SymbolType.constant },
  { tokens: ['nu'], tex: 'nu', type: SymbolType.constant },
  { tokens: ['xi'], tex: 'xi', type: SymbolType.constant },
  { tokens: ['Xi'], tex: 'Xi', type: SymbolType.constant },
  { tokens: ['pi'], tex: 'pi', type: SymbolType.constant },
  { tokens: ['Pi'], tex: 'Pi', type: SymbolType.constant },
  { tokens: ['rho'], tex: 'rho', type: SymbolType.constant },
  { tokens: ['sigma'], tex: 'sigma', type: SymbolType.constant },
  { tokens: ['Sigma'], tex: 'Sigma', type: SymbolType.constant },
  { tokens: ['tau'], tex: 'tau', type: SymbolType.constant },
  { tokens: ['upsilon'], tex: 'upsilon', type: SymbolType.constant },
  { tokens: ['phi'], tex: 'phi', type: SymbolType.constant },
  { tokens: ['Phi'], tex: 'Phi', type: SymbolType.constant },
  { tokens: ['varphi'], tex: 'varphi', type: SymbolType.constant },
  { tokens: ['chi'], tex: 'chi', type: SymbolType.constant },
  { tokens: ['psi'], tex: 'psi', type: SymbolType.constant },
  { tokens: ['Psi'], tex: 'Psi', type: SymbolType.constant },
  { tokens: ['omega'], tex: 'omega', type: SymbolType.constant },
  { tokens: ['Omega'], tex: 'Omega', type: SymbolType.constant },
] as const;

const text: TextOp[] = [];
const constants: ConstantOp[] = [];
const functions: FunctionOp[] = [];
const infix: InfixOp[] = [];
for (const symbol of symbols) {
  for (const token of symbol.tokens) {
    switch (symbol.type) {
      case SymbolType.text: {
        text.push({ token, tex: symbol.tex, type: symbol.type });
        break;
      }
      case SymbolType.function: {
        const functionName = getFunctionName(token);

        const args = token.match(/\(\$\$\)/g);
        if (!args) {
          throw new Error(`badly formated function token: ${functionName}`);
        }

        functions.push({
          arity: args.length,
          functionName,
          match: new RegExp(
            token.replace(/\$\$/g, '.*?').replace(/[()^|]/g, '\\$&'),
            'g',
          ),
          token,
          tex: symbol.tex,
          type: symbol.type,
        });
        break;
      }
      case SymbolType.infix: {
        infix.push({
          match: new RegExp(
            token.replace(/\$\$/g, '.*?').replace(/[+^${}()|[\]\\]/g, '\\$&'),
            'g',
          ),
          token,
          tex: symbol.tex,
          type: symbol.type,
        });
        break;
      }
      case SymbolType.constant: {
        constants.push({
          token,
          tex: {
            toString() {
              return `\\${symbol.tex}`;
            },
          },
          type: symbol.type,
        });
        break;
      }
      default:
        throw new Error(`unknown operation type: ${symbol.type}`);
    }
  }
}

const tokenLen = (s: Operation) => s.token.length;
export const operations = {
  text: orderBy(text, tokenLen, 'desc'),
  functions: keyBy(functions, 'functionName'),
  // infix: orderBy(infix, tokenLen, 'desc'),
  constants: orderBy(constants, tokenLen, 'desc'),
};
