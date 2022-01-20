"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiRoutesController = void 0;
const utils_1 = require("../../../utils");
const generateMongodbApiRoutes_1 = require("./databaseMongodbApiRoutes/generateMongodbApiRoutes");
const generatePostgressqlApiRoutes_1 = require("./databasePostgresqlApiRoutes/generatePostgressqlApiRoutes");
const generateApiRoutesController = (userInput) => {
    const configData = (0, utils_1.readNextConfig)();
    switch (configData.database) {
        case "postgresql":
            (0, generatePostgressqlApiRoutes_1.generatePostgresqlApiRoutes)(userInput);
            break;
        case "mongodb":
            (0, generateMongodbApiRoutes_1.generateMongodbApiRoutes)(userInput);
            break;
        default:
            break;
    }
};
exports.generateApiRoutesController = generateApiRoutesController;
