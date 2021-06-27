"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatorController = void 0;
const generateCrud_1 = require("./comboGenerators/generateCrud");
const generateModel_1 = require("./models/generateModel");
const generateApiRoutes_1 = require("./apiRoutes.js/generateApiRoutes");
const generateEmptyApiRoutes_1 = require("./apiRoutes.js/generateEmptyApiRoutes");
const generateRestTest_1 = require("./tests/generateRestTest");
const generatePages_1 = require("./pages/generatePages");
const generateEmptyPages_1 = require("./pages/generateEmptyPages");
const generatorController = (userInput) => {
    if (userInput[1] === "model" || userInput[1] === "m") {
        generateModel_1.generateModel(userInput);
    }
    else if (userInput[1] === "crud" || userInput[1] === "c") {
        generateCrud_1.generateCrud(userInput);
    }
    else if (userInput[1] === "api-routes" || userInput[1] === "a-r") {
        generateApiRoutes_1.generateApiRoutes(userInput);
    }
    else if (userInput[1] === "empty-api-routes" || userInput[1] === "e-a-r") {
        generateEmptyApiRoutes_1.generateEmptyApiRoutes(userInput);
    }
    else if (userInput[1] === "tests" || userInput[1] === "t") {
        generateRestTest_1.generateRestTest(userInput);
    }
    else if (userInput[1] === "pages" || userInput[1] === "p") {
        generatePages_1.generatePages(userInput);
    }
    else if (userInput[1] === "empty-pages" || userInput[1] === "e-p") {
        generateEmptyPages_1.generateEmptyPages(userInput);
    }
    else {
        console.log(`Sorry, that command wasnt recognized`);
    }
};
exports.generatorController = generatorController;
