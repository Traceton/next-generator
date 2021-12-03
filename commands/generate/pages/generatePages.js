"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePages = void 0;
const utils_1 = require("../../../utils");
const fs_1 = require("fs");
const getDynamicData_1 = require("./utils/getDynamicData");
const generateIndex_1 = require("./index/generateIndex");
const generateDynamic_1 = require("./dynamic/generateDynamic");
const generateCreate_1 = require("./create/generateCreate");
const generateEdit_1 = require("./edit/generateEdit");
const generatePages = async (userInput) => {
    const modelName = userInput[2];
    const modelItems = userInput.slice(3);
    if (!modelName) {
        return `no modelName recieved`;
    }
    const upperCaseFirstLetterModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const finalDynamicData = (0, getDynamicData_1.getDynamicDataForPages)(modelName, modelItems);
    const indexPage = (0, generateIndex_1.generateIndex)(modelName, finalDynamicData.finalSchemaItemsForIndex);
    const dynamicPage = (0, generateDynamic_1.generateDynamic)(modelName, upperCaseFirstLetterModelName, finalDynamicData.finalSchemaItemsForDynamicPage);
    const createPage = (0, generateCreate_1.generateCreate)(modelName, upperCaseFirstLetterModelName, finalDynamicData.finalJsonBodyItems, finalDynamicData.finalFormFieldItems);
    const editPage = (0, generateEdit_1.generateEdit)(modelName, upperCaseFirstLetterModelName, finalDynamicData.finalJsonBodyItems, finalDynamicData.finalEditFormFieldItems);
    if (!(0, fs_1.existsSync)(`pages`)) {
        (0, utils_1.createDirectory)("pages");
    }
    if (!(0, fs_1.existsSync)(`pages/${modelName}s`)) {
        (0, utils_1.createDirectory)(`pages/${modelName}s`);
    }
    if (!(0, fs_1.existsSync)(`pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`)) {
        (0, utils_1.createDirectory)(`pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`);
    }
    if (!(0, fs_1.existsSync)(`.env.local`)) {
        (0, utils_1.createFile)(".env.local", ` MONGODB_URI=your-database-string-here 
        NEXT_PUBLIC_HOST_URL=http://localhost:3000
    `);
    }
    (0, utils_1.createFile)(`pages/${modelName}s/index.js`, indexPage);
    (0, utils_1.createFile)(`pages/${modelName}s/[${modelName}Id].js`, dynamicPage);
    (0, utils_1.createFile)(`pages/${modelName}s/create${upperCaseFirstLetterModelName}.js`, createPage);
    (0, utils_1.createFile)(`pages/${modelName}s/edit${upperCaseFirstLetterModelName}s/[${modelName}Id].js`, editPage);
};
exports.generatePages = generatePages;
