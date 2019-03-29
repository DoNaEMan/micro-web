import { DEV, PORT } from './constantConfig';
import externalDomain from './externalDomain';

const LOCAL_HOST = '127.0.0.1';
const LOCAL_PORT = process.env[PORT] || 8080;
const DOMAIN = `http://${LOCAL_HOST}:${LOCAL_PORT}`;

export default {
  LOCAL_HOST,
  LOCAL_PORT,
  DOMAIN,
  externalDomain: externalDomain[DEV],
};
