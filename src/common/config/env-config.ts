export interface EnvConfig {
  redisUrl: string;
}

export const envConfig: EnvConfig = {
  redisUrl: String(process.env.REDIS_URL),
};
