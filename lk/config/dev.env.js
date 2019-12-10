'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROUTER_BASE: '"/lk/"',
  API_URL: '"https://localhost:8080/"',
  watchOptions: {
    poll: 1000
  }
})
