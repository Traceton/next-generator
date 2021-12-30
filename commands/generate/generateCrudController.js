"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCrudController = void 0;
const generateModelController_1 = require("./models/generateModelController");
const generateApiRoutesController_1 = require("./apiRoutes/generateApiRoutesController");
const generatePagesController_1 = require("./pages/generatePagesController");
const generateCrudController = (userInput) => {
    (0, generateModelController_1.generateModelController)(userInput);
    (0, generateApiRoutesController_1.generateApiRoutesController)(userInput);
    (0, generatePagesController_1.generatePagesController)(userInput);
};
exports.generateCrudController = generateCrudController;
