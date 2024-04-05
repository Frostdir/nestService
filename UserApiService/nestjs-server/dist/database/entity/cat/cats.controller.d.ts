import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';
export declare class CatsController {
    create(createCatDto: CreateCatDto): string;
    findAll(query: ListAllEntities): string;
    findOne(id: string): string;
    update(id: string, updateCatDto: UpdateCatDto): string;
    remove(id: string): string;
}
