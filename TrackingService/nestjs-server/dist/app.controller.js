"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const nestjs_redis_1 = require("nestjs-redis");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
__decorate([
    swagger_1.ApiProperty({ example: 120, nullable: false, required: true, type: Number, title: 'Значение координаты x' }),
    __metadata("design:type", Number)
], Point.prototype, "x", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 535, nullable: false, required: true, type: Number, title: 'Значение координаты y' }),
    __metadata("design:type", Number)
], Point.prototype, "y", void 0);
class SetPositionDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty({ example: 2, nullable: false, required: true, type: Number, title: 'Уникальный идентификатор трекера' }),
    __metadata("design:type", Number)
], SetPositionDto.prototype, "trackerID", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty({ example: new Point(5, 3), nullable: false, required: true, type: Point, title: 'Позиция трекера' }),
    __metadata("design:type", Point)
], SetPositionDto.prototype, "position", void 0);
class GetPositionDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty({ example: 2, nullable: false, required: true, type: Number, title: 'Уникальный идентификатор трекера' }),
    __metadata("design:type", Number)
], GetPositionDto.prototype, "trackerID", void 0);
let AppController = class AppController {
    constructor(appService, redisService) {
        this.appService = appService;
        this.redisService = redisService;
        this.client = this.redisService.getClient();
    }
    getCurrentTime() {
        const now = new Date();
        console.log(now);
        return now;
    }
    setPosition(setPositionDto) {
        console.log(JSON.stringify(Object.assign(Object.assign({}, setPositionDto.position), { updatedAt: new Date() })));
        this.client.set(String(setPositionDto.trackerID), JSON.stringify(Object.assign(Object.assign({}, setPositionDto.position), { updatedAt: new Date() })));
        return 'ok';
    }
    getPosition(getPositionDto) {
        return this.client
            .get(String(getPositionDto.trackerID))
            .then((value) => JSON.parse(value));
    }
    async getAllActualPositions() {
        const result = [];
        const data = await this.client.keys('*');
        for (const k in data) {
            const t = await this.client.get(String(data[k]));
            if (Math.abs((new Date().getTime() - new Date(JSON.parse(t).updatedAt).getTime()) / 1000) < 50000) {
                result.push(Object.assign({ trackerID: Number(data[k]) }, JSON.parse(t)));
            }
        }
        return result;
    }
    flushall() {
        return this.client.flushall();
    }
};
__decorate([
    common_1.Get('getCurrentTime'),
    swagger_1.ApiOperation({ summary: 'Получить текущее серверное время' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getCurrentTime", null);
__decorate([
    common_1.Post('/setPosition'),
    swagger_1.ApiOperation({ summary: 'Установить текущую позицию устройства с заданным ID' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SetPositionDto]),
    __metadata("design:returntype", String)
], AppController.prototype, "setPosition", null);
__decorate([
    common_1.Post('/getPosition'),
    swagger_1.ApiOperation({ summary: 'Получить текущую позицию устройства с заданным ID' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPositionDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPosition", null);
__decorate([
    common_1.Post('/getAllActualPositions'),
    swagger_1.ApiOperation({ summary: 'Получить акутальный id и местоположение какого нибудь устройства.', description: 'Актуальность определяется тем, что любое устройство которое обновляло своё местоположение раньше чем 50000 секунд назад, то оно является активным!' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllActualPositions", null);
__decorate([
    common_1.Get('/flushall'),
    swagger_1.ApiOperation({ summary: 'Очистить базу данных' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "flushall", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        nestjs_redis_1.RedisService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map