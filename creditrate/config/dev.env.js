'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: 'http://webbankir.zenwwwd',
  OLD_API_URL: 'http://webbankir.api',
  LK_URL: 'http://webbankir.lk'
})
