import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'antfu/reasonable-newline': 'off',
    'e18e/prefer-regex-test': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
  },
}, {
  ignores: [
    'src/imports.ts',
  ],
}).override('antfu/markdown/rules', {
  rules: {
    'markdown/require-alt-text': 'off',
  },
})
