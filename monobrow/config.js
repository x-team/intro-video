module.exports = {
  entry: 'src/index.js',
  output: {
    dir: 'dist',
    vendor: 'vendor.js'
  },
  packs: [
    require('./frontend-pack')
  ]
}
