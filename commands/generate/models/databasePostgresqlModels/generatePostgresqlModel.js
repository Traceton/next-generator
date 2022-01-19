"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePostgresqlModel = void 0;
const utils_1 = require("../../../../utils");
const fs_1 = __importDefault(require("fs"));
const generatePostgresqlModel = async (userInput) => {
    let modelName = userInput[2];
    let configData = (0, utils_1.readNextConfig)();
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
        try {
            let path = `${configData.projectRootPath}/prisma/schema.prisma`;
            const rawConfigFile = fs_1.default.readFileSync(path, { encoding: "utf8" });
            if (!rawConfigFile || rawConfigFile == undefined) {
                console.log("no prisma schema found, cannot modify");
            }
            else {
                configData = JSON.parse(rawConfigFile);
                console.log(`prisma schema -> ${configData}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.generatePostgresqlModel = generatePostgresqlModel;
