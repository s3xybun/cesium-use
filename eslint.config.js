import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
  },
}, {
  ignores: [
    'src/imports.ts',
  ],
})
