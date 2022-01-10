"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInit = void 0;
const utils_1 = require("../../utils");
const generateInit = async (userInput) => {
    let configData = (0, utils_1.readNextConfig)();
    try {
        const nextGenConfig = `
{
    "database": "mongodb",
    "pageType": "none",
    "projectRootPath":""
}`;
        (0, utils_1.createFile)(`${configData.projectRootPath}nextGenConfig.json`, nextGenConfig);
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.generateInit = generateInit;
