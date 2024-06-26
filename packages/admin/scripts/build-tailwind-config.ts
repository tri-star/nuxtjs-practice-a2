import fs from 'fs'
import { type Config } from 'tailwindcss'
import { buildTailwindConfig } from './lib/build-tailwind-config'
import { merge } from 'lodash'

let theme: Config['theme'] = {}

fs.readdirSync('figma-vars').forEach((filePath) => {
  theme = merge(theme, buildTailwindConfig(`figma-vars/${filePath}`))
})

theme['backgroundImage'] = {
  'login-background': "url('@/assets/login-background.png')",
}

const tailwindConfig = {
  content: ['./src/pages/**/*.vue', './src/layouts/**/*.vue', './src/components/**/*.vue', './src/features/**/*.vue'],
  theme,
  plugins: [],
}

fs.writeFileSync(
  'tailwind.config.js',
  [
    '// this file is generated by scripts/build-tailwind-config.ts', //
    "/** @type {import('tailwindcss').Config} */", //
    `export default ${JSON.stringify(tailwindConfig, null, 2)}`,
  ].join('\n'),
)
