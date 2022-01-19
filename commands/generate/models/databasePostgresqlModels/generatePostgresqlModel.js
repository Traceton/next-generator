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
        let finalSchemaItems = [];
        modelItems.map((unSplitEntry) => {
            let entry = unSplitEntry.split(":");
            let entryName = entry[0];
            let entryType = entry[1];
            const modelField = `${entryName} ${entryType}`;
            finalSchemaItems.push(modelField);
        });
        let newModel = `
      model ${upperCaseFirstLetterModelName} {
        id String @id @default(cuid())
        ${finalSchemaItems}
      }
      `;
        try {
            let path = `${configData.projectRootPath}prisma/schema.prisma`;
            const rawConfigFile = fs_1.default.readFileSync(path, { encoding: "utf8" });
            if (!rawConfigFile || rawConfigFile == undefined) {
                console.log("no prisma schema found, cannot modify");
            }
            else {
                fs_1.default.appendFile(path, newModel, function (error) {
                    if (error)
                        console.log(`prisma schema mod error -> ${error}`);
                    console.log('Updated schema!');
                });
            }
        }
        catch (error) {
            console.log(`prisma schema mod error -> ${error}`);
        }
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.generatePostgresqlModel = generatePostgresqlModel;
