"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModelController = void 0;
const utils_1 = require("../../../utils");
const generateMongooseModel_1 = require("./databaseMongodb/generateMongooseModel");
const generateModelController = (userInput) => {
    const configData = (0, utils_1.readNextConfig)();
    if (configData.database == "none" || !configData.database) {
    }
    else if (configData.database == "mongodb") {
        (0, generateMongooseModel_1.generateMongooseModel)(userInput);
    }
};
exports.generateModelController = generateModelController;
