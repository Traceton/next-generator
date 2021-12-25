"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePagesController = void 0;
const utils_1 = require("../../../utils");
const nonePageController_1 = require("./pageTypeNonePages/nonePageController");
const tailwindcssPageController_1 = require("./pageTypeTailwindcssPages/tailwindcssPageController");
const generatePagesController = async (userInput) => {
    const configData = (0, utils_1.readNextConfig)();
    if (configData.pageType == "none" || !configData.pageType) {
        (0, nonePageController_1.nonePageController)(userInput);
    }
    else if (configData.pageType == "tailwindcss") {
        (0, tailwindcssPageController_1.tailwindcssPageController)(userInput);
    }
};
exports.generatePagesController = generatePagesController;
