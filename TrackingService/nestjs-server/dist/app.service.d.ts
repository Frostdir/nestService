import { RedisService } from 'nestjs-redis';
export declare class AppService {
    private readonly redisService;
    constructor(redisService: RedisService);
    setPosition(): any;
}
