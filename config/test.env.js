var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  spaRootPath: JSON.stringify('/spa'),
  apis: JSON.stringify({
    default: {
      path: '/finup-fanmicd',
      proxy: 'http://finup-fanmicd-admin-server.superloan.beta'
    }
  })
})
