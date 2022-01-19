"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModelController = void 0;
const utils_1 = require("../../../utils");
const generatePostgresqlModel_1 = require("./databasePostgresqlModels/generatePostgresqlModel");
const generateMongooseModel_1 = require("./databaseMongodbModels/generateMongooseModel");
const generateModelController = (userInput) => {
    const configData = (0, utils_1.readNextConfig)();
    switch (configData.database) {
        case "postgresql":
            (0, generatePostgresqlModel_1.generatePostgresqlModel)(userInput);
            break;
        case "mongodb":
            (0, generateMongooseModel_1.generateMongooseModel)(userInput);
            break;
        default:
            break;
    }
};
exports.generateModelController = generateModelController;
