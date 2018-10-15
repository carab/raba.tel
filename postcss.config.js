const postcssPresetEnv = require('postcss-preset-env')

module.exports = () => ({
  plugins: [
    postcssPresetEnv({
      stage: 0,
      importFrom: ['./src/components/layout/vars.css'],
    }),
  ],
})
