module.exports = {
  entry: 'src/demo.js',
  output: {
    dir: 'dist',
    vendor: 'vendor.js'
  },
  packs: [
    require('./frontend-pack')
  ]
}
