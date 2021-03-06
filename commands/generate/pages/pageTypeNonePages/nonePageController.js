"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonePageController = void 0;
const utils_1 = require("../../../../utils");
const fs_1 = require("fs");
const getDynamicNoneData_1 = require("./getDynamicNoneData");
const generateIndex_1 = require("./generateIndex");
const generateDynamic_1 = require("./generateDynamic");
const generateCreate_1 = require("./generateCreate");
const generateEdit_1 = require("./generateEdit");
const nonePageController = async (userInput) => {
    const modelName = userInput[2];
    let configData = (0, utils_1.readNextConfig)();
    let idType = (0, utils_1.getIdType)();
    const modelItems = userInput.slice(3);
    if (!modelName) {
        return `no modelName recieved`;
    }
    if (!modelItems) {
        return `no modelItems recieved`;
    }
    const upperCaseFirstLetterModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const finalDynamicData = (0, getDynamicNoneData_1.getDynamicNoneData)(modelName, modelItems);
    const indexPage = (0, generateIndex_1.generateIndex)(modelName, idType, finalDynamicData.finalSchemaItemsForIndex);
    const dynamicPage = (0, generateDynamic_1.generateDynamic)(modelName, idType, upperCaseFirstLetterModelName, finalDynamicData.finalSchemaItemsForDynamicPage);
    const createPage = (0, generateCreate_1.generateCreate)(modelName, idType, upperCaseFirstLetterModelName, finalDynamicData.finalJsonBodyItems, finalDynamicData.finalFormFieldItems);
    const editPage = (0, generateEdit_1.generateEdit)(modelName, idType, upperCaseFirstLetterModelName, finalDynamicData.finalJsonBodyItems, finalDynamicData.finalEditFormFieldItems);
    if (!(0, fs_1.existsSync)(`${configData.projectRootPath}pages`)) {
        (0, utils_1.createDirectory)(`${configData.projectRootPath}pages`);
    }
    if (!(0, fs_1.existsSync)(`${configData.projectRootPath}pages/${modelName}s`)) {
        (0, utils_1.createDirectory)(`${configData.projectRootPath}pages/${modelName}s`);
    }
    if (!(0, fs_1.existsSync)(`${configData.projectRootPath}pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`)) {
        (0, utils_1.createDirectory)(`${configData.projectRootPath}pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`);
    }
    (0, utils_1.createFile)(`${configData.projectRootPath}pages/${modelName}s/index.js`, indexPage);
    (0, utils_1.createFile)(`${configData.projectRootPath}pages/${modelName}s/[${modelName}Id].js`, dynamicPage);
    (0, utils_1.createFile)(`${configData.projectRootPath}pages/${modelName}s/create${upperCaseFirstLetterModelName}.js`, createPage);
    (0, utils_1.createFile)(`${configData.projectRootPath}pages/${modelName}s/edit${upperCaseFirstLetterModelName}s/[${modelName}Id].js`, editPage);
};
exports.nonePageController = nonePageController;
