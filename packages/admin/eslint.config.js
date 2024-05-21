import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    rules: {
      'vue/html-self-closing': 'off', // Prettierと衝突するため
    },
  },
])
