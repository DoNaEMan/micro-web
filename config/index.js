import { DEV, PRD, DEPLOY_ENV } from './constantConfig';

const env = process.env[DEPLOY_ENV] || DEV;
let config = null;

switch (env) {
  case PRD:
    config = require('./config.prd'); break;
  default:
    config = require('./config.dev');
}

export default config;
