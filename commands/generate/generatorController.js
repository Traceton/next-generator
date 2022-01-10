"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatorController = void 0;
const fs_1 = require("fs");
const utils_1 = require("../../utils");
const generateCrudController_1 = require("./generateCrudController");
const generateModelController_1 = require("./models/generateModelController");
const generateApiRoutesController_1 = require("./apiRoutes/generateApiRoutesController");
const generatePagesController_1 = require("./pages/generatePagesController");
const generatorController = (userInput) => {
    let configData = (0, utils_1.readNextConfig)();
    if (configData.projectRootPath) {
        if (!(0, fs_1.existsSync)(configData.projectRootPath)) {
            (0, utils_1.createDirectory)(configData.projectRootPath);
        }
    }
    console.log(configData);
    if (userInput[1] === "model" || userInput[1] === "m") {
        (0, generateModelController_1.generateModelController)(userInput);
    }
    else if (userInput[1] === "crud" || userInput[1] === "c") {
        (0, generateCrudController_1.generateCrudController)(userInput);
    }
    else if (userInput[1] === "api-routes" || userInput[1] === "a-r") {
        (0, generateApiRoutesController_1.generateApiRoutesController)(userInput);
    }
    else if (userInput[1] === "empty-api-routes" || userInput[1] === "e-a-r") {
    }
    else if (userInput[1] === "tests" || userInput[1] === "t") {
    }
    else if (userInput[1] === "pages" || userInput[1] === "p") {
        (0, generatePagesController_1.generatePagesController)(userInput);
    }
    else if (userInput[1] === "empty-pages" || userInput[1] === "e-p") {
    }
    else {
        console.log(`Sorry, that command wasnt recognized`);
    }
};
exports.generatorController = generatorController;
