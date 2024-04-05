"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catsProviders = void 0;
const user_entity_1 = require("./user.entity");
exports.catsProviders = [
    {
        provide: 'CATS_REPOSITORY',
        useValue: user_entity_1.Cat,
    },
];
//# sourceMappingURL=cats.providers.js.map