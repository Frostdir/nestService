import { Cat } from './user.entity';
export declare class CatsService {
    private catsRepository;
    constructor(catsRepository: typeof Cat);
    findAll(): Promise<Cat[]>;
}
