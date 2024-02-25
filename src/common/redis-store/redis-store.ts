import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import { envConfig } from '../config/env-config';

const keyvRedis = new KeyvRedis(envConfig.redisUrl);
keyvRedis.on('error', (err) => {
  console.error({ err, msg: 'Redis connection failed' });
});
process.on('uncaughtException', () => {
  console.error({ msg: 'unknown error' });
});

export const keyv = new Keyv({ store: keyvRedis });
