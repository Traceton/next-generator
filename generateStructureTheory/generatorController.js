"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatorController = void 0;
const utils_1 = require("../../utils");
const generateCrud_1 = require("./comboGenerators/generateCrud");
const generateModel_1 = require("./models/generateModel");
const generateApiRoutes_1 = require("./apiRoutes.js/generateApiRoutes");
const generateEmptyApiRoutes_1 = require("./apiRoutes.js/generateEmptyApiRoutes");
const generateRestTest_1 = require("./tests/generateRestTest");
const generatePagesController_1 = require("./pages/generatePagesController");
const generateEmptyPages_1 = require("./pages/generateEmptyPages");
const generatorController = (userInput) => {
    let configData = (0, utils_1.readNextConfig)();
    console.log(configData);
    if (userInput[1] === "model" || userInput[1] === "m") {
        (0, generateModel_1.generateModel)(userInput);
    }
    else if (userInput[1] === "crud" || userInput[1] === "c") {
        (0, generateCrud_1.generateCrud)(userInput);
    }
    else if (userInput[1] === "api-routes" || userInput[1] === "a-r") {
        (0, generateApiRoutes_1.generateApiRoutes)(userInput);
    }
    else if (userInput[1] === "empty-api-routes" || userInput[1] === "e-a-r") {
        (0, generateEmptyApiRoutes_1.generateEmptyApiRoutes)(userInput);
    }
    else if (userInput[1] === "tests" || userInput[1] === "t") {
        (0, generateRestTest_1.generateRestTest)(userInput);
    }
    else if (userInput[1] === "pages" || userInput[1] === "p") {
        (0, generatePagesController_1.generatePages)(userInput);
    }
    else if (userInput[1] === "empty-pages" || userInput[1] === "e-p") {
        (0, generateEmptyPages_1.generateEmptyPages)(userInput);
    }
    else {
        console.log(`Sorry, that command wasnt recognized`);
    }
};
exports.generatorController = generatorController;
