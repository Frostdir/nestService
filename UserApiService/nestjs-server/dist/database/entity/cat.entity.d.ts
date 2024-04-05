import { Model } from 'sequelize-typescript';
export declare class Cat extends Model<Cat> {
    name: string;
    age: number;
    breed: string;
}
