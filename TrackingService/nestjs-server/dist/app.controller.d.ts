/// <reference types="ioredis" />
import { AppService } from './app.service';
import { RedisService } from 'nestjs-redis';
declare class Point {
    constructor(x: number, y: number);
    x: number;
    y: number;
}
declare class SetPositionDto {
    trackerID: number;
    position: Point;
}
declare class GetPositionDto {
    trackerID: number;
}
export declare class AppController {
    private readonly appService;
    private readonly redisService;
    client: import("ioredis").Redis;
    constructor(appService: AppService, redisService: RedisService);
    getCurrentTime(): any;
    setPosition(setPositionDto: SetPositionDto): string;
    getPosition(getPositionDto: GetPositionDto): Promise<string | null>;
    getAllActualPositions(): Promise<any>;
    flushall(): any;
}
export {};
