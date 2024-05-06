const tseslint = require('typescript-eslint')
const sharedConfig = require('a2-eslint/shared-eslint-config')

module.exports = tseslint.config({
  extends: [...sharedConfig],
})
