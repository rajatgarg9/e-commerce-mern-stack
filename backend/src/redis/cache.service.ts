import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';

import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async get(key: string): Promise<any> {
    return this.cache.get(key);
  }

  async set(key: string, value, ttl = 1000) {
    return this.cache.set(key, value, { ttl });
  }

  async reset() {
    return this.cache.reset();
  }

  async del(key: string) {
    return this.cache.del(key);
  }
}
