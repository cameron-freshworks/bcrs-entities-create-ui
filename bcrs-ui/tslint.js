module.exports = {
  root: true,
  env: {
    node: true
  },
  defaultSeverity: 'warning',
  extends: [
    'tslint:recommended',
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  linterOptions: {
    exclude: [
      'node_modules/**'
    ]
  },
  rules: {
    'indent': [true, 'spaces', 2],
    'interface-name': false,
    'no-consecutive-blank-lines': false,
    'object-literal-sort-keys': false,
    'ordered-imports': false,
    'quotemark': [true, 'single'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['warn', { code: 120 }]
  }
}
