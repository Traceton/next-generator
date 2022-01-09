"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInit = void 0;
const utils_1 = require("../../utils");
const generateInit = async (userInput) => {
    try {
        const nextGenConfig = `
            {
                "database": "mongodb",
                "pageType": "tailwindcss"
            }`;
        (0, utils_1.createFile)(`nextGenConfig.json`, nextGenConfig);
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.generateInit = generateInit;
