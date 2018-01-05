const dotEnv = require('dotenv');
const webpackProd = require('./config/webpack.production');
const webpackDev = require('./config/webpack.development');

dotEnv.config();

const { NODE_ENV } = process.env;

let config;

switch (NODE_ENV) {
case 'development':
  config = webpackDev;
  break;

case 'production':
  config = webpackProd;
  break;

default:
  config = webpackDev;
}

module.exports = config;
