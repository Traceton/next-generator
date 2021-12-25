"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePagesController = void 0;
const utils_1 = require("../../../utils");
const tailwindcssPageController_1 = require("./pageTypeTailwindcssPages/tailwindcssPageController");
const generatePagesController = async (userInput) => {
    const configData = (0, utils_1.readNextConfig)();
    if (configData.pageType == "none" || !configData.pageType) {
    }
    else if (configData.pageType == "tailwindcss") {
        (0, tailwindcssPageController_1.tailwindcssPageController)(userInput);
    }
};
exports.generatePagesController = generatePagesController;
