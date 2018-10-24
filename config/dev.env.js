var merge = require('webpack-merge')

module.exports = merge(require('./prod.env'), {
  NODE_ENV: '"development"',
  spaRootPath: '"/spa"',
  apis: JSON.stringify({
    default: {
      path: '/finup-fanmicd',
      proxy: 'http://localhost:30916'
    }
  })
})
