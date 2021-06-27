"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmptyPages = void 0;
const utils_1 = require("../../../utils");
const fs_1 = require("fs");
const generateEmptyPages = async (userInput) => {
    const modelName = userInput[2];
    if (!modelName) {
        return `no modelName recieved`;
    }
    const indexPage = `// blank content for pages index`;
    const dynamicPage = `// blank dynamic page`;
    if (!fs_1.existsSync(`pages`)) {
        await utils_1.createDirectory("pages");
    }
    if (!fs_1.existsSync(`pages/${modelName}s`)) {
        await utils_1.createDirectory(`pages/${modelName}s`);
    }
    utils_1.createFile(`pages/${modelName}s/index.js`, indexPage);
    utils_1.createFile(`pages/${modelName}s/[${modelName}Id].js`, dynamicPage);
};
exports.generateEmptyPages = generateEmptyPages;
