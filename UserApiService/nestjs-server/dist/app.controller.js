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
exports.AppController = exports.CreateUserDto = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./database/entity/user/user.entity");
const users_service_1 = require("./database/entity/user/users.service");
const swagger_1 = require("@nestjs/swagger");
const axios_1 = require("axios");
class CreateUserDto {
}
__decorate([
    swagger_1.ApiProperty({ example: "Mike", nullable: false, required: true, title: "Имя пользователя" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({ example: "qwerty", nullable: false, required: true, title: "Пароль пользователя" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({ default: "", required: false, title: "Дополнительные данные(опционально)" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "payload", void 0);
__decorate([
    swagger_1.ApiProperty({ example: "passenger", enum: ['driver', 'passenger'], nullable: false, required: true, title: "Роль пользователя" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    swagger_1.ApiProperty({ example: "89867716516", required: true, title: "Мобильный номер пользователя" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "mobile", void 0);
exports.CreateUserDto = CreateUserDto;
class DeleteUserByIDDto {
}
__decorate([
    swagger_1.ApiProperty({ example: 1, nullable: false, required: true, title: "Уникальный идентификатор пользователя" }),
    __metadata("design:type", Number)
], DeleteUserByIDDto.prototype, "id", void 0);
class FindUserByIDDto {
}
__decorate([
    swagger_1.ApiProperty({ example: 1, nullable: false, required: true, title: "Уникальный идентификатор пользователя" }),
    __metadata("design:type", Number)
], FindUserByIDDto.prototype, "id", void 0);
class FindUserByPhonePasswordRoleDto {
}
__decorate([
    swagger_1.ApiProperty({ example: "89049221829", nullable: false, required: true, title: "Мобильный номер пользователя" }),
    __metadata("design:type", String)
], FindUserByPhonePasswordRoleDto.prototype, "mobile", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'qwerty123', nullable: false, required: true, title: "Пароль пользователя" }),
    __metadata("design:type", String)
], FindUserByPhonePasswordRoleDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({ example: "passenger", enum: ['driver', 'passenger'], required: true, title: "Роль пользователя" }),
    __metadata("design:type", String)
], FindUserByPhonePasswordRoleDto.prototype, "role", void 0);
class UpdateUserByIDDto {
}
__decorate([
    swagger_1.ApiProperty({ example: 1, nullable: false, required: true, title: "Уникальный идентификатор пользователя" }),
    __metadata("design:type", Number)
], UpdateUserByIDDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({ example: true, nullable: false, required: true, title: "Включён ли пользователь" }),
    __metadata("design:type", Boolean)
], UpdateUserByIDDto.prototype, "enabled", void 0);
__decorate([
    swagger_1.ApiProperty({ example: "John", nullable: false, required: true, title: "Имя пользователя" }),
    __metadata("design:type", String)
], UpdateUserByIDDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({ example: "123", nullable: false, required: true, title: "Пароль пользователя" }),
    __metadata("design:type", String)
], UpdateUserByIDDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({ example: "89193153735", nullable: false, required: true, title: "Мобильный номер пользователя" }),
    __metadata("design:type", String)
], UpdateUserByIDDto.prototype, "mobile", void 0);
__decorate([
    swagger_1.ApiProperty({ example: `{'simpleText': "hello world"}`, nullable: false, required: true, title: "Дополнительные данные" }),
    __metadata("design:type", String)
], UpdateUserByIDDto.prototype, "payload", void 0);
class findDriverByIDDto {
}
__decorate([
    swagger_1.ApiProperty({ example: 1, nullable: false, required: true, title: "Уникальный идентификатор водителя" }),
    __metadata("design:type", Number)
], findDriverByIDDto.prototype, "id", void 0);
class FindPassengerByIDDto {
}
__decorate([
    swagger_1.ApiProperty({ example: 1, nullable: false, required: true, title: "Уникальный идентификатор пассажира" }),
    __metadata("design:type", Number)
], FindPassengerByIDDto.prototype, "id", void 0);
let userserviceURL = "localhost";
let orderserviceURL = "localhost";
let costcalcserviceURL = "localhost";
let trackingserviceURL = "localhost";
let AppController = class AppController {
    constructor(appService, userService) {
        this.appService = appService;
        this.userService = userService;
    }
    createUser(createUserDto) {
        console.log(createUserDto);
        const user = new user_entity_1.User();
        user.name = createUserDto.name;
        user.password = createUserDto.password;
        user.payload = createUserDto.payload;
        user.mobile = createUserDto.mobile;
        user.role = createUserDto.role;
        return this.userService.save(user);
    }
    findUserByID(findUserByIDDto) {
        return this.userService.findOne(String(findUserByIDDto.id));
    }
    async findPassengerByID(findPassengerByIDDto) {
        let result;
        try {
            result = (await this.userService.find({ id: String(findPassengerByIDDto.id), role: "passenger" })).pop();
        }
        catch (e) {
            result = e;
        }
        return result;
    }
    async findDriverByID(findDriverByIDDto) {
        const f = (await axios_1.default.post('http://' + orderserviceURL + ':4004/findOrderByParams', {
            driver: findDriverByIDDto.id,
            enabled: true
        })).data;
        console.log(await this.userService.find({ id: String(findDriverByIDDto.id), role: "driver" }).then(r => r.pop()));
        let result = (await this.userService.find({ id: String(findDriverByIDDto.id), role: "driver" })).pop();
        result['isFree'] = f.length == 0 ? true : false;
        return result;
    }
    findUserByPhonePasswordRole(findUserByPhonePasswordRoleDto) {
        console.log(findUserByPhonePasswordRoleDto);
        return this.userService.find({ mobile: findUserByPhonePasswordRoleDto.mobile, password: findUserByPhonePasswordRoleDto.password, role: findUserByPhonePasswordRoleDto.role });
    }
    updateUserByID(updateUserByIDDto) {
        return this.userService
            .findOne(String(updateUserByIDDto.id))
            .then((u) => {
            u.name = updateUserByIDDto.name;
            u.password = updateUserByIDDto.password;
            u.payload = updateUserByIDDto.payload;
            u.enabled = updateUserByIDDto.enabled;
            return u;
        })
            .then((u) => this.userService.save(u));
    }
    deleteUserByID(deleteUserByIDDto) {
        return this.userService.remove(String(deleteUserByIDDto.id));
    }
};
__decorate([
    common_1.Post('/createUser'),
    swagger_1.ApiOperation({ summary: 'Создание пользователя' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createUser", null);
__decorate([
    common_1.Post('/findUserByID'),
    swagger_1.ApiOperation({ summary: 'Поиск пользователя по ID' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FindUserByIDDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findUserByID", null);
__decorate([
    common_1.Post('/findPassengerByID'),
    swagger_1.ApiOperation({ summary: 'Поиск пассажира по ID' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FindPassengerByIDDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findPassengerByID", null);
__decorate([
    common_1.Post('/findDriverByID'),
    swagger_1.ApiOperation({ summary: 'Поиск водителя по ID' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findDriverByIDDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findDriverByID", null);
__decorate([
    common_1.Post('/findUserByPhonePasswordRole'),
    swagger_1.ApiOperation({ summary: 'Поиск пользователя по мобильному номеру и паролю' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FindUserByPhonePasswordRoleDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findUserByPhonePasswordRole", null);
__decorate([
    common_1.Post('/updateUserByID'),
    swagger_1.ApiOperation({ summary: 'Обновление даннных пользователя по ID', description: "Необходимо, чтобы все поля были заполнены!!!" }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateUserByIDDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateUserByID", null);
__decorate([
    common_1.Post('/deleteUserByID'),
    swagger_1.ApiOperation({ summary: 'Удаление пользователя по ID' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeleteUserByIDDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteUserByID", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        users_service_1.UsersService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map