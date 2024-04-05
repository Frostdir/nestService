import { AppService } from './app.service';
import { User } from './database/entity/user/user.entity';
import { UsersService } from './database/entity/user/users.service';
export declare class CreateUserDto {
    readonly name: string;
    readonly password: string;
    readonly payload: string;
    readonly role: string;
    readonly mobile: string;
}
declare class DeleteUserByIDDto {
    readonly id: number;
}
declare class FindUserByIDDto {
    readonly id: number;
}
declare class FindUserByPhonePasswordRoleDto {
    readonly mobile: string;
    readonly password: string;
    readonly role: string;
}
declare class UpdateUserByIDDto {
    readonly id: number;
    readonly enabled: boolean;
    readonly name: string;
    readonly password: string;
    readonly mobile: string;
    readonly payload: string;
}
declare class findDriverByIDDto {
    readonly id: number;
}
declare class FindPassengerByIDDto {
    readonly id: number;
}
export declare class AppController {
    private readonly appService;
    private readonly userService;
    constructor(appService: AppService, userService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findUserByID(findUserByIDDto: FindUserByIDDto): Promise<User>;
    findPassengerByID(findPassengerByIDDto: FindPassengerByIDDto): Promise<User>;
    findDriverByID(findDriverByIDDto: findDriverByIDDto): Promise<User>;
    findUserByPhonePasswordRole(findUserByPhonePasswordRoleDto: FindUserByPhonePasswordRoleDto): Promise<User[]>;
    updateUserByID(updateUserByIDDto: UpdateUserByIDDto): Promise<User>;
    deleteUserByID(deleteUserByIDDto: DeleteUserByIDDto): Promise<void>;
}
export {};
