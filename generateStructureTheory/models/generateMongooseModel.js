"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModel = void 0;
const utils_1 = require("../../utils");
const fs_1 = require("fs");
const generateModel = async (userInput) => {
    let modelName = userInput[2];
    if (modelName === undefined || modelName === "undefined") {
        console.log(`must enter a model name`);
        return `must enter a model name`;
    }
    if (userInput.length <= 3) {
        console.log(`must enter model schema parameters`);
        return `must enter model schema parameters`;
    }
    try {
        const upperCaseFirstLetterModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        let modelItems = userInput.slice(3);
        let neWModelSchemaItems = [];
        modelItems.map((unSplitEntry) => {
            let entry = unSplitEntry.split(":");
            let entryName = entry[0];
            let entryType = entry[1];
            let modelField = {
                [entryName]: {
                    type: entryType,
                    required: true,
                },
            };
            let stringField = JSON.stringify(modelField)
                .replace("{", "")
                .replace("}", "");
            neWModelSchemaItems.push(stringField);
        });
        let createdOnField = `createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },`;
        neWModelSchemaItems.push(createdOnField);
        let finalSchemaItems = neWModelSchemaItems
            .toString()
            .replace("[", "")
            .replace("]", "")
            .replace(/"/g, "");
        let newModel = `const mongoose = require("mongoose"); \n

  const ${modelName}Schema = new mongoose.Schema({

  ${finalSchemaItems}

  }); \n

  module.exports = mongoose.models.${modelName} || mongoose.model("${modelName}", ${modelName}Schema);`;
        if (!(0, fs_1.existsSync)(`components`)) {
            await (0, utils_1.createDirectory)("components");
        }
        if (!(0, fs_1.existsSync)(`components/models`)) {
            await (0, utils_1.createDirectory)("components/models");
        }
        (0, utils_1.createFile)(`components/models/${upperCaseFirstLetterModelName}.js`, newModel);
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.generateModel = generateModel;
