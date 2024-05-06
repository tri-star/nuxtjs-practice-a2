import path from 'path'

const projectTsConfigPath = path.resolve(process.cwd(), 'tsconfig.json')

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import tsEslintParser from '@typescript-eslint/parser'
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'

export default tseslint.config(
  eslint.configs.recommended,
  // ...tseslint.configs.stylisticTypeChecked,
  {
    rules: [
      ...tseslint.configs.recommended.flatMap((config) => config.rules),
      ...tseslint.configs.recommendedTypeChecked.flatMap((config) => config.rules).filter((config) => config != null),
    ]
      .filter((config) => config !== undefined)
      .reduce((result, config) => ({ ...result, ...config }), {}),
    //
    // ].flatMap((c) => c),
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        project: projectTsConfigPath,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  ...pluginVue.configs['flat/recommended'],
)
