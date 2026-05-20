import flandre from '@flandredaisuki/eslint-config';

/** @satisfies {import('eslint').Linter.Config[]} */
export default [
  ...flandre.preset,
  {
    ignores: ['patches/*'],
  },
];
