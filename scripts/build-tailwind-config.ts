import fs from 'fs'
import { type Config } from 'tailwindcss'
import { buildTailwindConfig } from './lib/build-tailwind-config'

let theme: Config['theme'] = {}

fs.readdirSync('figma-vars').forEach((filePath) => {
  theme = { ...theme, ...buildTailwindConfig(`figma-vars/${filePath}`) }
})
