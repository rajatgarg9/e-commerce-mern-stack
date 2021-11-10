import * as redisStore from 'cache-manager-redis-store';

import { Module, CacheModule, Global } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        db: configService.get('REDIS_DB') || 0,
        password: configService.get('REDIS_PASSWORD'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [CacheService],
  exports: [CacheService],
})
export class RedisModule {}
