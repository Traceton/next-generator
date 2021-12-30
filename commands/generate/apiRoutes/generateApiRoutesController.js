"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiRoutesController = void 0;
const utils_1 = require("../../../utils");
const generateMongodbApiRoutes_1 = require("./databaseMongodbApiRoutes/generateMongodbApiRoutes");
const generateApiRoutesController = (userInput) => {
    const configData = (0, utils_1.readNextConfig)();
    if (configData.database == "none" || !configData.database) {
    }
    else if (configData.database == "mongodb") {
        (0, generateMongodbApiRoutes_1.generateMongodbApiRoutes)(userInput);
    }
};
exports.generateApiRoutesController = generateApiRoutesController;
