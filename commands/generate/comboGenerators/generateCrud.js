"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCrud = void 0;
const generateModel_1 = require("../models/generateModel");
const generateApiRoutes_1 = require("../apiRoutes.js/generateApiRoutes");
const generatePages_1 = require("../pages/generatePages");
const generateCrud = async (userInput) => {
    await generateModel_1.generateModel(userInput);
    await generateApiRoutes_1.generateApiRoutes(userInput);
    await generatePages_1.generatePages(userInput);
};
exports.generateCrud = generateCrud;
