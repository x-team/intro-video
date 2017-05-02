const babelify = require('babelify')
const monobrow = require('monobrow')

module.exports = monobrow.pack({
  vendor: [
    'react',
    'react-dom'
  ],

  setup: function setup (b, opts) {
    b.transform(babelify)
  }
})
